/* mobile.js - phone layer. Loaded only on narrow screens (see index.html).
   Reuses the calculations of app.js (kpis, positions, allocation, chart helpers) and
   renders its own screens into #m. It never edits the PC DOM; on phones the PC
   interface is simply hidden by mobile.css. */
(function () {
"use strict";
var root = document.documentElement;
var S = { scr: "r", sheet: null, open: {}, top: true };
var CHIPS = ["1W", "1M", "YTD", "1Y", "Max"];

/* ---------- small helpers ---------- */
function g(id) { return document.getElementById(id); }
function ic(p, c) { return '<svg class="mi' + (c ? " " + c : "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + "</svg>"; }
var I_UP = '<path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 16v3a1 1 0 001 1h14a1 1 0 001-1v-3"/>';
var I_MORE = '<circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/>';
var I_DOWN = '<path d="M6 9l6 6 6-6"/>';
var I_RIGHT = '<path d="M9 6l6 6-6 6"/>';
var sgn = function (v) { return (v > 0 ? "+" : "") + eur(v); };
var cls = function (v) { return Math.abs(v) < 0.005 ? "" : v > 0 ? "pos" : "neg"; };
var pcl = function (v) { return Math.abs(v) < 0.05 ? "" : v > 0 ? "pos" : "neg"; };

function seg(action, cur, list) {
  return '<div class="sgc">' + list.map(function (z) {
    return '<button type="button" data-a="' + action + '" data-v="' + z[0] + '"' + (cur === z[0] ? ' class="on" aria-pressed="true"' : ' aria-pressed="false"') + ">" + z[1] + "</button>";
  }).join("") + "</div>";
}
function chips(action, cur, list) {
  return '<div class="chips">' + list.map(function (z) {
    return '<button type="button" data-a="' + action + '" data-v="' + z[0] + '"' + (cur === z[0] ? ' class="on" aria-pressed="true"' : ' aria-pressed="false"') + ">" + z[1] + "</button>";
  }).join("") + "</div>";
}
function bmShort(b) {
  if (!b) return "index";
  var p = BMP.filter(function (z) { return z[0] === b.name; })[0];
  return p ? p[1] : bmLab(b.name);
}

/* ---------- Returns ---------- */
function vTiles() {
  var kp = document.createElement("div");
  kp.innerHTML = kpis(); /* also refreshes POSL, exactly as on PC */
  var tiles = [].slice.call(kp.querySelectorAll(".kpi")).map(function (k) {
    var kl = k.querySelector(".kl"), inf = kl.querySelector(".inf"), kv = k.querySelector(".kv");
    var lab = kl.childNodes[0] ? kl.childNodes[0].textContent : "";
    var tip = inf ? inf.getAttribute("data-tip") || "" : "";
    var sub = tip.split(/\.\s/)[0].replace(/\.$/, "");
    var c = /\bpos\b/.test(kv.className) ? " pos" : /\bneg\b/.test(kv.className) ? " neg" : "";
    return '<div class="tile"><div class="tl">' + esc(lab) + '</div><div class="tv' + c + '">' + esc(kv.textContent) + '</div><div class="ts">' + esc(sub) + "</div></div>";
  });
  var dots = tiles.map(function (_, i) { return "<i" + (i === 0 ? ' class="on"' : "") + "></i>"; }).join("");
  return '<div class="tiles" id="tiles">' + tiles.join("") + '</div><div class="dots" id="dots">' + dots + "</div>";
}

function vChart() {
  var L = days.length - 1;
  var me = (PF === "all" && PT === "all") ? rows[0] : subRow(), bm = actB();
  var avail = TFA();
  var list = CHIPS.filter(function (t) { return avail.indexOf(t) >= 0; });
  if (list.indexOf(TF) < 0) TF = "Max";
  var i0 = Math.max(iStart(TF), 0), ser2 = [];
  function mk(r, name) {
    if (!r || r.st < 0) return;
    var a = Math.max(i0, r.st), bs = (TF === "Max" && r.kind !== "b") ? 100 : r.idx[a], v = [];
    for (var i = a; i <= L; i++) v.push((r.idx[i] / bs - 1) * 100);
    if (a < L) ser2.push({ name: name, a: a, v: v });
  }
  mk(me, "You");
  mk(bm, bmShort(bm));
  var body;
  if (!ser2.length) {
    body = '<p class="mu pad">Not enough data for this period.</p>';
  } else {
    var cw = Math.max(260, root.clientWidth - 64);
    CD.ch = { W: cw, H: Math.round(cw * 0.62) };
    CH = [];
    var t = document.createElement("div");
    t.innerHTML = lineChart(ser2, Math.min.apply(null, ser2.map(function (s) { return s.a; })), L, pctf, true);
    var svg = t.querySelector("svg.ch");
    var lg = ser2.map(function (s, k) {
      var v = s.v[s.v.length - 1];
      return '<span><b style="color:' + COL[k % COL.length] + '">\u25CF</b> ' + esc(s.name) + ' <i class="' + pcl(v) + '">' + pctf(v) + "</i></span>";
    }).join("");
    body = '<div class="chw">' + svg.outerHTML + '</div><div class="mlg">' + lg + "</div>";
  }
  return '<section class="card"><div class="ch-h"><h2>Performance</h2>' +
    (bm ? '<button type="button" class="mixb" data-a="ix">vs ' + esc(bmShort(bm)) + " " + ic(I_DOWN) + "</button>" : "") +
    "</div>" + chips("tf", TF, list.map(function (t) { return [t, t]; })) + body + "</section>";
}

function vReturns() {
  return vTiles() +
    seg("pf", PF, [["open", "Open"], ["all", "All"], ["closed", "Closed"]]) +
    vChart();
}

/* ---------- Positions ---------- */
function vPositions() {
  positions();
  var vis = POSL.filter(function (r) { return pf(r.k); });
  var tv = vis.reduce(function (a, r) { return a + r.val; }, 0), h = "";
  ["ETF", "Stock", "Derivative"].forEach(function (ty) {
    var grp = vis.filter(function (r) { return r.typ === ty; }).sort(function (a, b) { return byName(a.n, b.n); });
    if (!grp.length) return;
    h += '<div class="grp">' + TYPS[ty] + "</div>";
    grp.forEach(function (r) {
      var closed = !(r.q > 0), tot = r.un + r.real + r.dv;
      var base = closed ? r.bg : (r.val - r.un);
      var top = closed ? tot : r.val;
      var pc = closed ? (r.bg > 0.005 ? tot / r.bg * 100 : null) : (base > 0.005 ? r.un / base * 100 : null);
      var sub = closed ? "Closed" : sh(+r.q.toFixed(4)) + (r.o ? " contracts" : " shares") + (tv > 0 ? " \u00B7 " + (r.val / tv * 100).toFixed(1) + "%" : "");
      var cell = function (l, v, c) { return '<div><span>' + l + '</span><b class="' + (c || "") + '">' + v + "</b></div>"; };
      h += '<div class="pr' + (S.open[r.k] ? " open" : "") + '">' +
        '<button type="button" class="prh" data-a="row" data-v="' + esc(r.k) + '" aria-expanded="' + (S.open[r.k] ? "true" : "false") + '">' +
        '<span class="pl"><span class="pn">' + esc(r.n) + '</span><span class="psb">' + sub + "</span></span>" +
        '<span class="pv"><span class="pa ' + (closed ? cls(top) : "") + '">' + (closed ? sgn(top) : eur(top)) + '</span><span class="pp ' + (pc == null ? "" : pcl(pc)) + '">' + (pc == null ? "\u2013" : (pc > 0 ? "+" : "") + pc.toFixed(1) + "%") + (closed ? " <i>total</i>" : "") + "</span></span></button>" +
        '<div class="pd">' +
        cell("Avg buy", r.o || !r.q ? "\u2013" : "\u20AC" + f2(r.avg)) +
        cell("Price now", r.o ? "\u2013" : "\u20AC" + f2(r.px)) +
        cell("Unrealised", sgn(r.un), cls(r.un)) +
        cell("Realised", sgn(r.real), cls(r.real)) +
        cell("Dividends", sgn(r.dv), cls(r.dv)) +
        cell("Total", sgn(tot), cls(tot)) +
        "</div></div>";
    });
  });
  if (!h) h = '<p class="mu pad">No positions in this selection.</p>';
  return seg("pf", PF, [["all", "All"], ["open", "Open"], ["closed", "Closed"]]) +
    chips("pt", PT, [["all", "All types"], ["ETF", "ETFs"], ["Stock", "Stocks"], ["Derivative", "Derivatives"]]) +
    '<div class="plist">' + h + "</div>";
}

/* ---------- Allocation ---------- */
function vAlloc() {
  positions();
  var t = document.createElement("div");
  t.innerHTML = allocation();
  var svg = t.querySelector("svg[data-pie]");
  var rowsH = [].slice.call(t.querySelectorAll("tr")).map(function (tr) {
    var td = tr.children, b = td[0].querySelector("b");
    var name = td[0].textContent.replace(/^\s*\u25CF\s*/, "");
    return '<div class="al"><i style="background:' + (b ? b.style.color : "var(--mu)") + '"></i><span class="an">' + esc(name) + '</span><span class="ap">' + esc(td[2].textContent) + '</span><span class="av">' + esc(td[1].textContent) + "</span></div>";
  }).join("");
  var tabs = seg("alv", ALV, [["t", "Type"], ["s", "Sector"], ["c", "Currency"], ["h", "Position"]]);
  if (!svg) return tabs + '<section class="card"><p class="mu pad">Nothing to show.</p></section>';
  return tabs + '<section class="card pieh">' + svg.outerHTML + '</section><div class="alist">' + rowsH + "</div>";
}

/* ---------- More ---------- */
function vMore() {
  var li = function (a, v, l) { return '<button type="button" class="li" data-a="' + a + '" data-v="' + v + '"><span>' + l + "</span>" + ic(I_RIGHT) + "</button>"; };
  return '<div class="list">' + li("scr", "a", "Allocation") + li("upload", "", "Data and settings") + "</div>" +
    '<div class="lab">Appearance</div>' + seg("mode", MODEV, [["light", "Light"], ["dark", "Dark"]]);
}

function vSoon(name) {
  return '<section class="card empty"><h2>' + name + '</h2><p class="mu">This screen has no phone design yet. It comes in a later round, after snapshots are approved.</p></section>';
}

function vEmpty() {
  var t = (g("msg") && g("msg").textContent || "").trim();
  var saved = ls.get("tx") || ls.get("txd");
  var txt = t || (saved ? "Loading your portfolio\u2026" : "Load your Saxo or Degiro export to get started. The data stays in this browser.");
  return '<section class="card empty"><h2>No portfolio loaded</h2><p class="mu">' + esc(txt) + '</p><button type="button" class="go" data-a="upload">Load data</button></section>';
}

/* ---------- sheet (index picker) ---------- */
function vSheet() {
  if (S.sheet !== "ix") return "";
  var cur = ixCur();
  var ex = rows.filter(function (r) { return r.kind === "b"; }).map(function (r) { return r.name; })
    .filter(function (n) { return !BMP.some(function (p) { return p[0] === n; }); });
  var opts = BMP.map(function (p) { return [p[0], p[1]]; }).concat(ex.map(function (n) { return [n, bmLab(n)]; }));
  return '<div class="sheet" data-a="close"><div class="sh" data-a="noop"><div class="sht">Compare with</div>' +
    opts.map(function (p) { return '<button type="button" class="so' + (p[0] === cur ? " on" : "") + '" data-a="ixpick" data-v="' + esc(p[0]) + '">' + esc(p[1]) + "</button>"; }).join("") +
    '<button type="button" class="so" data-a="ixpick" data-v="__other">Other\u2026</button></div></div>';
}

/* ---------- shell ---------- */
var TITLES = { r: "My Portfolio", p: "Positions", t: "Activity", d: "Dividends", m: "More", a: "Allocation" };
function nav() {
  var on = function (k) { return S.scr === k || (k === "m" && S.scr === "a"); };
  var b = function (k, l, p) { return '<button type="button" data-a="scr" data-v="' + k + '"' + (on(k) ? ' class="on" aria-current="page"' : "") + ">" + ic(p) + "<span>" + l + "</span></button>"; };
  return '<nav class="mb">' + b("r", "Returns", TABI.r) + b("p", "Positions", TABI.p) + b("t", "Activity", TABI.t) + b("d", "Dividends", TABI.d) + b("m", "More", I_MORE) + "</nav>";
}
function head() {
  var eye = '<button type="button" class="mib" data-a="hide" title="' + (HIDE ? "Show amounts" : "Hide amounts") + '" aria-label="' + (HIDE ? "Show amounts" : "Hide amounts") + '">' + (HIDE ? EYE_OFF : EYE) + "</button>";
  var up = '<button type="button" class="mib" data-a="upload" title="Load data and settings" aria-label="Load data and settings">' + ic(I_UP) + "</button>";
  return '<header class="mh"><h1>' + TITLES[S.scr] + '</h1><div class="mt">' + eye + (S.scr === "a" ? "" : up) + "</div></header>";
}

function mRender() {
  var tl = g("tiles"), tx0 = tl ? tl.scrollLeft : 0, y = window.pageYOffset;
  var body;
  try {
    TAB = (S.scr === "p" || S.scr === "a" || S.scr === "t" || S.scr === "d") ? S.scr : "r";
    CH = [];
    if (S.scr === "m") body = vMore();
    else if (!rows.length) body = vEmpty();
    else if (S.scr === "r") body = vReturns();
    else if (S.scr === "p") body = vPositions();
    else if (S.scr === "a") body = vAlloc();
    else body = vSoon(TITLES[S.scr]);
  } catch (e) {
    body = '<section class="card empty"><h2>Something went wrong</h2><p class="mu">' + esc(e && e.message || e) + "</p></section>";
    if (window.console) console.error(e);
  }
  g("m").innerHTML = head() + '<main class="mv">' + body + "</main>" + nav() + vSheet();
  var t2 = g("tiles");
  if (t2) { t2.scrollLeft = tx0; t2.addEventListener("scroll", dots, { passive: true }); dots(); }
  window.scrollTo(0, S.top ? 0 : y);
  S.top = false;
}
function dots() {
  var t = g("tiles"), d = g("dots");
  if (!t || !d || !t.firstElementChild) return;
  var step = t.firstElementChild.offsetWidth + 12, n = d.children.length;
  var i = t.scrollLeft >= t.scrollWidth - t.clientWidth - 2 ? n - 1 : Math.round(t.scrollLeft / step);
  for (var k = 0; k < n; k++) d.children[k].className = k === i ? "on" : "";
}

/* ---------- events ---------- */
var M = document.createElement("div");
M.id = "m";
document.body.appendChild(M);
var bar = document.createElement("div");
bar.id = "mst"; bar.hidden = true;
document.body.appendChild(bar);
root.classList.add("m");

M.addEventListener("click", function (e) {
  var b = e.target.closest && e.target.closest("[data-a]");
  if (!b) return;
  var a = b.getAttribute("data-a"), v = b.getAttribute("data-v");
  if (a === "noop") return;
  if (a === "scr") { S.scr = v; S.sheet = null; S.top = true; mRender(); }
  else if (a === "pf") { PF = v; ls.set("pf", PF); mRender(); }
  else if (a === "pt") { PT = v; ls.set("pt", PT); mRender(); }
  else if (a === "tf") { TF = v; mRender(); }
  else if (a === "alv") { ALV = v; mRender(); }
  else if (a === "hide") { setHide(!HIDE); if (!rows.length) mRender(); }
  else if (a === "upload") g("setup").hidden = false;
  else if (a === "ix") { S.sheet = "ix"; mRender(); }
  else if (a === "close") { S.sheet = null; mRender(); }
  else if (a === "ixpick") { S.sheet = null; mRender(); ixPick(v); }
  else if (a === "mode") { setLook(v); if (!rows.length) mRender(); }
  else if (a === "row") {
    var pr = b.parentNode, o = !pr.classList.contains("open");
    pr.classList.toggle("open", o); b.setAttribute("aria-expanded", o ? "true" : "false"); S.open[v] = o;
  }
});
/* touch-drag and tap on charts and pie reuse the PC hover code */
M.addEventListener("pointermove", hov);
M.addEventListener("pointerdown", hov);

/* ---------- hook into app.js ---------- */
var origRender = window.render;
window.render = function (syms, bad, warn) {
  /* symbols that need fixing, data checks and holding detail still use the PC view */
  if ((bad && bad.length) || DBG || DET) {
    root.classList.add("m-fb");
    return origRender.apply(this, arguments);
  }
  root.classList.remove("m-fb");
  mRender();
};

/* loading status from app.js messages */
var msgEl = g("msg");
if (msgEl && window.MutationObserver) {
  new MutationObserver(function () {
    var t = (msgEl.textContent || "").trim();
    if (/^(Loading|Looking)/.test(t)) { bar.textContent = t; bar.hidden = false; } else bar.hidden = true;
    if (!rows.length && !root.classList.contains("m-fb")) mRender();
  }).observe(msgEl, { childList: true, characterData: true, subtree: true });
}

ALV = "t"; /* phone starts the allocation on Type, as in the approved snapshot */
mRender();
})();
