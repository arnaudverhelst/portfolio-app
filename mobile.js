/* mobile.js - phone layer. Loaded only on narrow screens (see index.html).
   Reuses the calculations of app.js (kpis, positions, allocation, chart helpers) and
   renders its own screens into #m. It never edits the PC DOM; on phones the PC
   interface is simply hidden by mobile.css. */
(function () {
"use strict";
var root = document.documentElement;
var S = { scr: "r", sheet: null, open: {}, top: true, al: "a", dv: "o", txN: 80, uem: "", unm: "", uerr: "" };
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
function bmName(n) {
  var p = BMP.filter(function (z) { return z[0] === n; })[0];
  return p ? p[1] : bmLab(n);
}
function bmShort(b) { return bmName(b ? b.name : ixCur()); }

/* ---------- Returns ---------- */
/* turns the KPI tiles of the PC code (kpis, dividends, wealth builder) into swipeable phone tiles */
function tilesFrom(box, tid, did) {
  var tiles = [].slice.call(box.querySelectorAll(".kpi")).map(function (k) {
    var kl = k.querySelector(".kl"), inf = kl.querySelector(".inf"), kv = k.querySelector(".kv"), ks = k.querySelector(".ks");
    var lab = kl.childNodes[0] ? kl.childNodes[0].textContent : "";
    var sub = ks ? ks.textContent : (inf ? (inf.getAttribute("data-tip") || "").split(/\.\s/)[0].replace(/\.$/, "") : "");
    var c = /\bpos\b/.test(kv.className) ? " pos" : /\bneg\b/.test(kv.className) ? " neg" : "";
    return '<div class="tile"><div class="tl">' + esc(lab) + '</div><div class="tv' + c + '">' + esc(kv.textContent) + '</div><div class="ts">' + esc(sub) + "</div></div>";
  });
  var dots = tiles.map(function (_, i) { return "<i" + (i === 0 ? ' class="on"' : "") + "></i>"; }).join("");
  return '<div class="tiles" id="' + tid + '">' + tiles.join("") + '</div><div class="dots" id="' + did + '">' + dots + "</div>";
}
function vTiles() {
  var kp = document.createElement("div");
  kp.innerHTML = kpis(); /* also refreshes POSL, exactly as on PC */
  return tilesFrom(kp, "tiles", "dots");
}
function fp(v) { return v == null ? "\u2013" : (v > 0 ? "+" : "") + (v * 100).toFixed(1) + "%"; }
function cw0() { return Math.max(260, root.clientWidth - 64); }
function sinceOf(r) {
  var d = days[Math.max(0, r.st)];
  return r.st < 0 || !d ? "" : "since " + MN[+d.slice(5, 7) - 1].slice(0, 3) + " " + d.slice(0, 4);
}

function vChart() {
  if (HIDE) VM = "p";
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
  var val = VM === "v";
  if (val) {
    var st0 = rows[0].st, x0 = TF === "Max" ? st0 : Math.max(st0, iStart(TF));
    if (x0 >= L) x0 = st0;
    if (st0 >= 0 && st0 < L) {
      var vv = [], nn = [], cum = 0, kk = 0;
      for (var i2 = 0; i2 <= L; i2++) {
        while (kk < tx.length && tx[kk].di <= i2) { cum += (tx[kk].q > 0 ? 1 : -1) * (isFinite(tx[kk].cs) ? tx[kk].cs : tx[kk].g); kk++; }
        if (i2 >= x0) { vv.push(valueAt(i2)); nn.push(cum); }
      }
      ser2.push({ name: "Value of holdings", a: x0, v: vv }, { name: "Net invested", a: x0, v: nn });
    }
  } else {
    mk(me, "You");
    mk(bm, bmShort(bm));
  }
  var body;
  if (!ser2.length) {
    body = '<p class="mu pad">Not enough data for this period.</p>';
  } else {
    var cw = cw0();
    CD.ch = { W: cw, H: Math.round(cw * 0.62) };
    CH = [];
    var t = document.createElement("div");
    t.innerHTML = lineChart(ser2, Math.min.apply(null, ser2.map(function (s) { return s.a; })), L, val ? eur : pctf, !val);
    var svg = t.querySelector("svg.ch");
    var lg = ser2.map(function (s, k) {
      var v = s.v[s.v.length - 1];
      return '<span><b style="color:' + COL[k % COL.length] + '">\u25CF</b> ' + esc(s.name) + ' <i class="' + (val ? "" : pcl(v)) + '">' + (val ? eur(v) : pctf(v)) + "</i></span>";
    }).join("");
    body = '<div class="chw">' + svg.outerHTML + '</div><div class="mlg">' + lg + "</div>";
  }
  var wn = ((typeof G !== "undefined" && G && G.warn) || []).map(function (w) { return '<p class="note">' + esc(w) + "</p>"; }).join("");
  body += wn;
  var tog = HIDE ? "<h2>Performance</h2>" : seg("vm", VM, [["p", "Performance"], ["v", "Value"]]).replace('class="sgc"', 'class="sgc mini"');
  return '<section class="card"><div class="ch-h">' + tog +
    (val ? "" : '<button type="button" class="mixb" data-a="ix">vs ' + esc(bmShort(bm)) + " " + ic(I_DOWN) + "</button>") +
    "</div>" + chips("tf", TF, list.map(function (t) { return [t, t]; })) + body +
    (val ? '<p class="note">Holdings only, cash not included. The gap between the lines is your profit.</p>' : '<p class="note">Hold and drag over the chart to measure a period.</p>') + "</section>";
}

function vRetList() {
  var per = TFA().indexOf(TF) >= 0 ? TF : "Max", PL = TFA();
  var one = function (r) {
    var key = "r:" + (r.k || r.name), v = rt(r, per), cg = cagr(r);
    var name = r.kind === "b" ? bmLab(r.name) + " (benchmark)" : r.name;
    var det = PL.map(function (t) { var x = rt(r, t); return '<div><span>' + t + '</span><b class="' + (x == null ? "" : pcl(x)) + '">' + fp(x) + "</b></div>"; }).join("") +
      '<div><span>CAGR</span><b class="' + (cg == null ? "" : pcl(cg)) + '">' + fp(cg) + "</b></div>";
    var open = S.open[key];
    return '<div class="pr' + (open ? " open" : "") + '"><button type="button" class="prh" data-a="row" data-v="' + esc(key) + '" aria-expanded="' + (open ? "true" : "false") + '">' +
      '<span class="pl"><span class="pn">' + esc(name) + '</span><span class="psb">' + (cg != null ? "CAGR " + fp(cg) : sinceOf(r)) + "</span></span>" +
      '<span class="pv"><span class="pa ' + (v == null ? "" : pcl(v)) + '">' + fp(v) + "</span></span></button>" +
      '<div class="pd">' + det + "</div></div>";
  };
  var top = (PF === "all" && PT === "all") ? rows.filter(function (r) { return !r.k && (r.kind !== "b" || r === actB()); }) : [subRow()].concat([actB()]).filter(Boolean);
  var h = top.map(one).join("");
  ["ETF", "Stock", "Derivative"].forEach(function (ty) {
    var grp = rows.filter(function (r) { return r.k && r.typ === ty && (PT === "all" || r.typ === PT) && (PF === "all" || (PF === "open") === !!r.open); }).sort(function (a, b) { return byName(a.name, b.name); });
    if (grp.length) h += '<div class="grp">' + TYPS[ty] + "</div>" + grp.map(one).join("");
  });
  return '<section class="card"><div class="ch-h"><h2>Returns \u00B7 ' + per + '</h2><button type="button" class="mixb" data-a="costs">Costs ' + (MODE ? "included" : "excluded") + " " + ic(I_DOWN) + '</button></div><div class="plist">' + h + '</div><p class="note">The period follows the chart. Tap a row for all periods and CAGR. A dash means it was not held in that period. Dividends count as reinvested.</p></section>';
}
function vReturns() {
  return vTiles() +
    seg("pf", PF, [["open", "Open"], ["all", "All"], ["closed", "Closed"]]) +
    vChart() + vRetList();
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
      var Lc = LOC && r.loc ? r.loc : null;
      var closed = !(r.q > 0), tot = r.un + r.real + r.dv;
      var base = closed ? r.bg : (r.val - r.un);
      var top = closed ? tot : r.val;
      var pc = closed ? (r.bg > 0.005 ? tot / r.bg * 100 : null) : (base > 0.005 ? r.un / base * 100 : null);
      var money = function (v) { return Lc ? lc0(v, Lc.cur) : eur(v); }, smoney = function (v) { return Lc ? lcsg(v, Lc.cur) : sgn(v); };
      if (Lc) {
        var ltot = Lc.un + Lc.real + Lc.dv, lbase = closed ? Lc.bg : Lc.cu;
        tot = ltot; top = closed ? ltot : Lc.val;
        pc = closed ? (Lc.bg > 0.005 ? ltot / Lc.bg * 100 : null) : (lbase > 0.005 ? Lc.un / lbase * 100 : null);
      }
      var sub = closed ? "Closed" : sh(+r.q.toFixed(4)) + (r.o ? " contracts" : " shares") + (tv > 0 ? " \u00B7 " + (r.val / tv * 100).toFixed(1) + "%" : "");
      var cell = function (l, v, c) { return '<div><span>' + l + '</span><b class="' + (c || "") + '">' + v + "</b></div>"; };
      h += '<div class="pr' + (S.open[r.k] ? " open" : "") + '">' +
        '<button type="button" class="prh" data-a="row" data-v="' + esc(r.k) + '" aria-expanded="' + (S.open[r.k] ? "true" : "false") + '">' +
        '<span class="pl"><span class="pn">' + esc(r.n) + '</span><span class="psb">' + sub + "</span></span>" +
        '<span class="pv"><span class="pa ' + (closed ? cls(top) : "") + '">' + (closed ? smoney(top) : money(top)) + '</span><span class="pp ' + (pc == null ? "" : pcl(pc)) + '">' + (pc == null ? "\u2013" : (pc > 0 ? "+" : "") + pc.toFixed(1) + "%") + (closed ? " <i>total</i>" : "") + "</span></span></button>" +
        '<div class="pd">' +
        cell("Avg buy", r.o || !(r.q > 0 || r.qb > 0) ? "\u2013" : Lc ? lc2(Lc.avg, Lc.cur) : "\u20AC" + f2(r.avg)) +
        cell("Price now", r.o ? "\u2013" : Lc ? lc2(Lc.px, Lc.cur) : "\u20AC" + f2(r.px)) +
        cell("Unrealised", smoney(Lc ? Lc.un : r.un), cls(Lc ? Lc.un : r.un)) +
        cell("Realised", smoney(Lc ? Lc.real : r.real), cls(Lc ? Lc.real : r.real)) +
        cell("Dividends", smoney(Lc ? Lc.dv : r.dv), cls(Lc ? Lc.dv : r.dv)) +
        cell("Total", smoney(tot), cls(tot)) +
        "</div></div>";
    });
  });
  if (!h) h = '<p class="mu pad">No positions in this selection.</p>';
  var two = '<div class="two">' + seg("pcm", String(MODE), [["1", "Incl. costs"], ["0", "Excl."]]) + "</div>";
  return seg("pf", PF, [["all", "All"], ["open", "Open"], ["closed", "Closed"]]) + two +
    chips("pt", PT, [["all", "All types"], ["ETF", "ETFs"], ["Stock", "Stocks"], ["Derivative", "Derivatives"]]) +
    '<div class="plist">' + h + "</div>" + (LOC ? '<p class="note">Each position is shown in the currency it trades in. Totals stay in \u20AC.</p>' : "");
}

/* ---------- Allocation ---------- */
function vContrib() {
  var t = document.createElement("div");
  t.innerHTML = contribCard();
  var cs = [].slice.call(t.querySelectorAll(".cs > div")).map(function (d) {
    var b = d.querySelector("b");
    return '<div><span>' + esc(d.querySelector("span").textContent) + '</span><b class="' + (/neg/.test(b.className) ? "neg" : "pos") + '">' + esc(b.textContent) + "</b></div>";
  }).join("");
  var list = "";
  [].slice.call(t.querySelectorAll("table tr")).forEach(function (tr) {
    var td = tr.children;
    if (!td.length || td[0].tagName === "TH") return;
    if (td[0].classList.contains("grp")) { list += '<div class="grp">' + esc(td[0].textContent) + "</div>"; return; }
    var bar = td[2] && td[2].firstChild, w = bar && bar.style ? parseFloat(bar.style.width) || 0 : 0, c = /neg/.test(td[1].className) ? "neg" : "pos";
    if (td[0].querySelector("b")) { list += '<div class="cr tot"><div class="cl"><span>Total</span><b>' + esc(td[1].textContent) + "</b></div></div>"; return; }
    list += '<div class="cr"><div class="cl"><span>' + esc(td[0].textContent) + '</span><b class="' + c + '">' + esc(td[1].textContent) + '</b></div><div class="cbar"><i class="' + c + '" style="width:' + w + '%"></i></div></div>';
  });
  var cp = TFA().map(function (x) { return [x, x]; });
  return chips("ctf", CTF, cp) + '<section class="card"><h2>Contribution to your return</h2><div class="cs">' + cs + "</div>" + list +
    '<p class="note">Points of your time-weighted return that came from each holding. They add up to the return of the period.</p></section>';
}
function vAlloc() {
  var sw = seg("alsub", S.al, [["a", "Allocation"], ["c", "Contribution"]]);
  if (S.al === "c") { positions(); return sw + vContrib(); }
  return sw + vAllocPie();
}
function vAllocPie() {
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

/* the PC charts print a long summary top-right; on a phone it is shown as a line above the chart instead */
function svgPrep(t) {
  var svg = t.querySelector("svg.dv"), sm = "";
  if (!svg) return { svg: "", sm: "" };
  var x = svg.querySelector('text[text-anchor="end"][y="12"]');
  if (x) { sm = x.textContent; x.parentNode.removeChild(x); }
  return { svg: svg.outerHTML, sm: sm }; /* crowding is handled afterwards by dvFit (chartfit.js) */
}
var tipOf = function (r) { return r.sm ? '<div class="tip">' + esc(r.sm) + "</div>" : ""; };

/* ---------- Transactions ---------- */
function expRow(key, name, sub, right, rc, det) {
  var open = S.open[key];
  return '<div class="pr' + (open ? " open" : "") + '"><button type="button" class="prh" data-a="row" data-v="' + esc(key) + '" aria-expanded="' + (open ? "true" : "false") + '">' +
    '<span class="pl"><span class="pn">' + esc(name) + '</span><span class="psb">' + sub + "</span></span>" +
    '<span class="pv"><span class="pa ' + (rc || "") + '">' + right + "</span></span></button>" +
    '<div class="pd">' + det.map(function (d) { return '<div class="' + (d[2] || "") + '"><span>' + d[0] + "</span><b>" + d[1] + "</b></div>"; }).join("") + "</div></div>";
}
function txControls(extra) {
  return seg("txv", TXV, [["table", "Table"], ["chart", "Bought &amp; sold"], ["gain", "Gain / loss"]]) + (extra || "");
}
function vTxChart() {
  var R = txBS(), yrs = [];
  R.forEach(function (r) { var y = r.d.slice(0, 4); if (yrs.indexOf(y) < 0) yrs.push(y); });
  yrs.sort();
  if (!(TXS === "all" || yrs.indexOf(TXS) >= 0)) TXS = yrs[yrs.length - 1] || "all";
  var ct = chips("txp", TXS, yrs.map(function (y) { return [y, y]; }).concat([["all", "All time"]]));
  if (!R.length) return txControls(ct) + '<section class="card"><p class="mu pad">No buys or sells to show yet.</p></section>';
  var cw = cw0();
  CD.dv = { W: cw, H: Math.round(cw * 0.85) };
  var t = document.createElement("div");
  t.innerHTML = txChart();
  var pr = svgPrep(t);
  return txControls(ct) + '<section class="card">' + tipOf(pr) + '<div class="chw">' + pr.svg + '</div><p class="note">Cash paid or received in euro, including trading costs. The figure above each period is net invested (bought minus sold).</p></section>';
}
function vTxGain() {
  var sp = GV === "split";
  var ct = '<div class="chips">' +
    '<button type="button" data-a="gv" data-v="tot"' + (!sp ? ' class="on"' : "") + ">Total</button>" +
    '<button type="button" data-a="gv" data-v="split"' + (sp ? ' class="on"' : "") + ">Realised / unrealised</button>" +
    '<button type="button" data-a="gd" data-v="1"' + (GD ? ' class="on"' : "") + ">Dividends</button></div>";
  if (!days.length) return txControls(ct) + '<section class="card"><p class="mu pad">No data to show yet.</p></section>';
  var cw = cw0();
  CD.dv = { W: cw, H: Math.round(cw * 0.85) };
  var t = document.createElement("div");
  t.innerHTML = txGain();
  var pr = svgPrep(t);
  return txControls(ct) + '<section class="card">' + tipOf(pr) + '<div class="chw">' + pr.svg + '</div><p class="note">Per calendar year, trading costs included. Realised is profit or loss on shares you sold. Unrealised is the change in the gain or loss on shares you still hold. Idle cash is not included.</p></section>';
}
function vTx() {
  if (TXV === "chart") return vTxChart();
  if (TXV === "gain") return vTxGain();
  var R = txRows();
  var sum = function (ty) { return R.filter(function (r) { return r.ty === ty; }).reduce(function (a, r) { return a + (isFinite(r.a) ? r.a : 0); }, 0); };
  var bought = -sum("Buy"), sold = sum("Sell"), dvn = sum("Dividend") + sum("Tax");
  R = R.filter(function (r) { return TXF === "all" || (TXF === "Other" ? ["Tax", "Fee", "Interest"].indexOf(r.ty) >= 0 : r.ty === TXF); });
  R.sort(function (x, y) { return (x.d < y.d ? -1 : x.d > y.d ? 1 : x.o - y.o) * TXO; });
  var total = R.length, shown = R.slice(0, S.txN), h = "", mon = "";
  shown.forEach(function (r) {
    var m = r.d.slice(0, 7);
    if (m !== mon) { mon = m; h += '<div class="mon">' + MN[+m.slice(5) - 1] + " " + m.slice(0, 4) + "</div>"; }
    var c = (r.ty === "Sell" || r.ty === "Dividend" || r.ty === "Interest") ? "pos" : (r.ty === "Fee" || r.ty === "Tax") ? "neg" : "";
    var amt = isFinite(r.a) ? (r.a > 0 ? "+" : "") + e2(r.a) : "\u2013";
    h += expRow("t:" + r.o, r.n, r.ty + " \u00B7 " + fd(r.d) + " \u00B7 " + r.b, amt, c, [
      ["Date", fd(r.d)], ["Type", r.ty], ["Broker", esc(r.b)],
      ["Shares", r.q == null ? "\u2013" : sh(r.q)], ["Price", esc(r.px)], ["Costs / tax", isFinite(r.f) && Math.abs(r.f) >= 0.005 ? e2(r.f) : "\u2013"]]);
  });
  if (!h) h = '<p class="mu pad">No transactions in this selection.</p>';
  var more = total > shown.length ? '<button type="button" class="more" data-a="txmore">Show more (' + (total - shown.length) + " left)</button>" : "";
  return txControls() +
    chips("txf", TXF, [["all", "All"], ["Buy", "Buys"], ["Sell", "Sells"], ["Dividend", "Dividends"], ["Other", "Fees, interest, other"]]) +
    '<div class="cs three"><div><span>Bought</span><b>' + eur(bought) + "</b></div><div><span>Sold</span><b>" + eur(sold) + "</b></div><div><span>Dividends, net</span><b>" + eur(dvn) + "</b></div></div>" +
    '<div class="sortl"><span>' + total + ' transactions</span><button type="button" class="mixb" data-a="txo">' + (TXO < 0 ? "Newest first" : "Oldest first") + " " + ic(I_DOWN) + '</button></div><div class="plist">' + h + "</div>" + more +
    '<p class="note">Amounts are cash in euro: negative is money spent on a buy, positive is money received. For dividends the last figure is the tax withheld; for trades it is trading costs.</p>';
}

/* ---------- Dividends ---------- */
function vDiv() {
  if (!DV.length && !AO.length) return '<section class="card empty"><h2>Dividends</h2><p class="mu">No dividend rows found. Load your Degiro account statement (and your Saxo file) with the upload button and press Calculate.</p></section>';
  var keepT = DVT, cw = cw0();
  CD.dv = { W: cw, H: Math.round(cw * 0.7) };
  DVT = "chart";
  var b = document.createElement("div"); b.innerHTML = dividends();
  DVT = "inst";
  var a = document.createElement("div"); a.innerHTML = dividends();
  DVT = keepT;
  var yrs = [];
  DV.forEach(function (e) { var y = e.d.slice(0, 4); if (yrs.indexOf(y) < 0) yrs.push(y); });
  yrs.sort();
  var body = "";
  if (S.dv === "p") {
    var B = {};
    DV.forEach(function (e) {
      var k = DVM === "m" ? e.d.slice(0, 7) : e.d.slice(0, 4), o = B[k] = B[k] || { g: 0, t: 0, c: 0, v: {} };
      o.g += e.g; o.t += e.t; if (e.g > 0) o.c++; o.v[e.n] = (o.v[e.n] || 0) + e.g + e.t;
    });
    var ks = Object.keys(B).sort().reverse(), h = "";
    ks.forEach(function (k) {
      var o = B[k], nm = DVM === "m" ? MN[+k.slice(5) - 1] + " " + k.slice(0, 4) : k;
      var by = Object.keys(o.v).sort(function (x, y) { return o.v[y] - o.v[x]; }).map(function (n) { return esc(n) + " " + eur(o.v[n]); }).join(" \u00B7 ");
      h += expRow("p:" + k, nm, o.c + (o.c === 1 ? " payment" : " payments"), eur(o.g + o.t), "pos", [
        ["Gross", eur(o.g)], ["Tax", eur(o.t)], ["Net", eur(o.g + o.t)], ["Paid by", by || "\u2013", "wide"]]);
    });
    body = chips("dvm", DVM, [["m", "Monthly"], ["y", "Yearly"]]) + '<section class="card"><h2>Payments per ' + (DVM === "m" ? "month" : "year") + '</h2><div class="plist">' + h + "</div></section>";
  } else {
    var ct = chips("dvp", DVS, yrs.map(function (y) { return [y, y]; }).concat([["all", "All time"], ["fc", "Forecast"]]));
    var pr = svgPrep(b);
    body = '<section class="card"><h2>Received</h2>' + ct + tipOf(pr) + '<div class="chw">' + pr.svg + "</div></section>";
    var inst = "";
    [].slice.call(a.querySelectorAll("table tr")).forEach(function (tr) {
      var td = tr.children;
      if (!td.length || td[0].tagName === "TH") return;
      if (td[0].classList.contains("grp")) { inst += '<div class="grp">' + esc(td[0].textContent) + "</div>"; return; }
      if (td.length < 8) return;
      var T = function (i) { return td[i].textContent; }, dps = T(5);
      inst += expRow("i:" + T(0), T(0), T(1) + (T(1) === "1" ? " payment" : " payments") + (dps !== "\u2013" ? " \u00B7 last " + esc(dps) + "/sh" : ""), esc(T(4)), "pos", [
        ["Payments", esc(T(1))], ["Gross", esc(T(2))], ["Tax", esc(T(3))], ["Net", esc(T(4))], ["Last per share", esc(dps)], ["Yield (12M)", esc(T(6))], ["Yield on cost", esc(T(7))]]);
    });
    body += '<section class="card"><h2>Per instrument</h2><div class="plist">' + inst + "</div></section>";
  }
  var notes = [].slice.call(b.querySelectorAll("p.mu")).map(function (p) { return '<p class="note">' + esc(p.textContent) + "</p>"; }).join("");
  return tilesFrom(a, "dtiles", "ddots") + seg("dvv", S.dv, [["o", "Overview"], ["p", "Payments"]]) + body + notes;
}

/* ---------- Wealth builder ---------- */
function wbData() {
  var age = WB.mode === "age", inf = WB.infl / 100, wr = Math.max(0.1, WB.wr) / 100, inc = WB.income * 12, a0 = Math.round(WB.age);
  var T = age ? Math.max(1, Math.min(70, 100 - a0)) : Math.max(1, Math.min(60, Math.round(WB.years)));
  var A = wbCalc(T, age), fr = function (y) { return WB.real ? Math.pow(1 + inf, -y) : 1; }, hit = age && A.hit != null;
  var n = T;
  if (hit) { var hy = A.hit / 12; n = Math.min(T, Math.max(2, Math.ceil(hy + Math.max(10, hy * 0.4)))); }
  var pts = A.pts.slice(0, n + 1);
  return { a0: a0, n: n, hit: hit ? A.hit : null, pts: pts,
    tot: pts.map(function (p, i) { return p.bal * fr(i); }), cn: pts.map(function (p, i) { return p.con * fr(i); }),
    tgt: age ? pts.map(function (p, i) { return WB.real ? inc / wr : A.tg(i * 12); }) : null };
}
function wbChart(D) {
  var W = cw0(), H = Math.round(W * 0.7), pl = 46, pr = 8, pt = 10, pb = 24, n = D.n;
  var raw0 = Math.max(1, Math.max.apply(null, D.tot)) * 1.08, raw = raw0 / 4, pw = Math.pow(10, Math.floor(Math.log10(raw))), q = raw / pw;
  var step = (q <= 1 ? 1 : q <= 2 ? 2 : q <= 2.5 ? 2.5 : q <= 5 ? 5 : 10) * pw, mx = Math.ceil(raw0 / step - 1e-9) * step;
  var xs = function (i) { return pl + i * (W - pl - pr) / n; }, ys = function (v) { return H - pb - v * (H - pt - pb) / mx; };
  var ek = function (v) { return HIDE ? "" : v >= 1e6 ? "\u20AC" + (+(v / 1e6).toFixed(2)) + "M" : v >= 1e3 ? "\u20AC" + Math.round(v / 1e3) + "k" : "\u20AC" + Math.round(v); };
  var pp = function (arr) { return arr.map(function (v, i) { return xs(i).toFixed(1) + "," + ys(v).toFixed(1); }).join(" "); };
  var g = "";
  for (var v = 0; v <= mx + step / 1000; v += step) {
    var y = ys(v).toFixed(1);
    g += '<line x1="' + pl + '" x2="' + (W - pr) + '" y1="' + y + '" y2="' + y + '" stroke="currentColor" opacity="' + (v ? ".08" : ".35") + '"/><text x="' + (pl - 6) + '" y="' + (+y + 4) + '" font-size="11" text-anchor="end" fill="currentColor">' + ek(v) + "</text>";
  }
  var base = ys(0).toFixed(1);
  g += '<polygon points="' + xs(0).toFixed(1) + "," + base + " " + pp(D.tot) + " " + xs(n).toFixed(1) + "," + base + '" style="fill:var(--ac)" opacity=".18"/>';
  g += '<polyline points="' + pp(D.cn) + '" fill="none" style="stroke:var(--mu)" stroke-width="1.5" stroke-dasharray="3 4"/>';
  if (D.tgt) g += '<polyline points="' + D.tgt.map(function (v, i) { return xs(i).toFixed(1) + "," + Math.max(pt, ys(v)).toFixed(1); }).join(" ") + '" fill="none" style="stroke:' + PIEC[1] + '" stroke-width="1.5" stroke-dasharray="6 4"/>';
  g += '<polyline points="' + pp(D.tot) + '" fill="none" style="stroke:var(--ac)" stroke-width="2.2" stroke-linejoin="round"/>';
  var ts = n <= 10 ? 1 : n <= 20 ? 2 : n <= 40 ? 5 : 10;
  for (var i = 0; i <= n; i += ts) g += '<text x="' + xs(i).toFixed(1) + '" y="' + (H - 7) + '" font-size="11" text-anchor="middle" fill="currentColor">' + (D.a0 + i) + "</text>";
  g += '<line id="wbl2" y1="' + pt + '" y2="' + (H - pb) + '" stroke="currentColor" opacity=".5" visibility="hidden"/>';
  var lg = '<span><b style="color:var(--ac)">\u25CF</b> Total value</span><span><b style="color:var(--mu)">\u25CF</b> Invested</span>' + (D.tgt ? '<span><b style="color:' + PIEC[1] + '">\u25CF</b> Capital needed</span>' : "");
  return '<section class="card"><h2>Projection</h2><div class="tip" id="wbtip">Touch the chart for values by age</div><div class="chw"><svg class="wbs" id="wbsv" viewBox="0 0 ' + W + " " + H + '" style="width:100%;height:auto;touch-action:pan-y">' + g + '</svg></div><div class="mlg">' + lg + '</div></section>';
}
function wbBind(D) {
  var sv = g("wbsv"); if (!sv) return;
  var W = cw0(), pl = 46, pr = 8, n = D.n;
  var hv = function (ev) {
    var r = sv.getBoundingClientRect(), x = (ev.clientX - r.left) / r.width * W;
    var i = Math.max(0, Math.min(n, Math.round((x - pl) * n / (W - pl - pr)))), px = pl + i * (W - pl - pr) / n;
    var l = g("wbl2"); l.setAttribute("x1", px); l.setAttribute("x2", px); l.setAttribute("visibility", "visible");
    g("wbtip").innerHTML = "Age " + (D.a0 + i) + " \u00B7 <b>" + eur(D.tot[i]) + "</b> total \u00B7 " + eur(D.cn[i]) + " invested" + (D.tgt ? " \u00B7 " + eur(D.tgt[i]) + " needed" : "");
  };
  sv.addEventListener("pointermove", hv); sv.addEventListener("pointerdown", hv);
}
function wbRefresh() {
  var out = g("wbx"), box = g("wbo");
  if (!out || !box) return;
  try {
    wbUpdate(); /* PC code fills #wbo; the tiles are taken from it */
    var D = wbData();
    out.innerHTML = tilesFrom(box, "wtiles", "wdots") + wbChart(D);
    wbBind(D); bindDots("wtiles", "wdots");
  } catch (e) { out.innerHTML = '<section class="card empty"><p class="mu">' + esc(e.message) + "</p></section>"; }
}
function vWealth() {
  positions();
  if (WB.start == null) WB.start = Math.round(POSL.reduce(function (a, r) { return a + r.val; }, 0));
  var age = WB.mode === "age";
  var f = function (k, l) {
    return '<label class="wf"><span>' + l + '</span><input class="inp" type="' + (HIDE && ["start", "monthly", "income"].indexOf(k) >= 0 ? "password" : "number") + '" inputmode="decimal" step="any" data-w="' + k + '" value="' + WB[k] + '"></label>';
  };
  var form = f("age", "Current age") + f("start", "Starting capital (\u20AC)") + f("monthly", "Monthly contribution (\u20AC)") + f("grow", "Annual increase (%)") + f("ret", "Expected return (%)") + f("infl", "Inflation (%)") +
    (age ? f("income", "Target monthly income (\u20AC)") : '<label class="wf wide"><span>Investment horizon: <b id="wby">' + WB.years + '</b> years</span><input type="range" min="1" max="50" step="1" data-w="years" value="' + WB.years + '"></label>') +
    f("wr", "Withdrawal rate (%)");
  return seg("wm", WB.mode, [["age", "Retirement age"], ["years", "Future value"]]) +
    '<div id="wbx"></div><div id="wbo" hidden></div>' +
    '<section class="card"><h2>Assumptions</h2><div class="wg">' + form + '</div><label class="chk"><input type="checkbox" data-w="real"' + (WB.real ? " checked" : "") + '> Show in today\u2019s euros (inflation-adjusted)</label>' +
    '<p class="note">Starting capital is prefilled with your portfolio value. The estimate assumes a constant yearly return, monthly contributions, and no taxes or fees. Retirement means your capital reaches the amount where the withdrawal rate gives your wanted income.</p></section>';
}

/* ---------- Users ---------- */
function vUsers() {
  var n = USR.length, pro = USR.filter(function (u) { return u.plan === "Pro"; }).length, act = USR.filter(function (u) { return u.status === "Active"; }).length;
  var tl = function (l, v, t) { return '<div class="kpi"><div class="kl">' + l + '</div><div class="kv">' + v + '</div><div class="ks">' + t + "</div></div>"; };
  var box = document.createElement("div");
  box.innerHTML = tl("Total users", n, "In this browser") + tl("Free", n - pro, "Basic access") + tl("Pro", pro, "Paid plan") + tl("Active", act, "Not suspended");
  var list = USR.map(function (u) {
    var c = function (a, cur, opts) { return '<div class="chips">' + opts.map(function (o) { return '<button type="button" data-a="' + a + '" data-v="' + u.id + "|" + o + '"' + (cur === o ? ' class="on"' : "") + ">" + o + "</button>"; }).join("") + "</div>"; };
    return '<div class="ur"><div class="ui"><b>' + esc(u.name || "\u2013") + "</b><small>" + esc(u.email) + " \u00B7 joined " + fd(u.joined) + '</small></div><div class="uc">' + c("upl", u.plan, ["Free", "Pro"]) + c("ust", u.status, ["Active", "Suspended"]) + '<button type="button" class="mixb" data-a="udel" data-v="' + u.id + '">Remove</button></div></div>';
  }).join("") || '<p class="mu pad">No users yet. Add a test user to see how plans and statuses will look.</p>';
  return tilesFrom(box, "utiles", "udots") +
    '<section class="card"><h2>Users</h2><div class="plist">' + list + "</div></section>" +
    '<section class="card"><h2>Add user</h2><div class="wg"><label class="wf wide"><span>Email</span><input class="inp" id="uem" type="email" autocomplete="off" placeholder="name@company.com" value="' + esc(S.uem || "") + '"></label>' +
    '<label class="wf"><span>Name</span><input class="inp" id="unm" autocomplete="off" value="' + esc(S.unm || "") + '"></label>' +
    '<label class="wf"><span>Plan</span><select class="inp" id="upm"><option>Free</option><option>Pro</option></select></label></div>' +
    (S.uerr ? '<p class="note neg">' + esc(S.uerr) + "</p>" : "") +
    '<button type="button" class="go" data-a="uadd">Add user</button>' +
    '<p class="note">This list is stored in this browser only, so it is a placeholder. Once you add a login and a backend, this screen reads the real user table.</p></section>';
}

/* ---------- More ---------- */
function vMore() {
  var li = function (a, v, l, sub) { return '<button type="button" class="li" data-a="' + a + '" data-v="' + v + '"><span>' + l + "<small>" + sub + "</small></span>" + ic(I_RIGHT) + "</button>"; };
  return '<div class="list">' + li("scr", "w", "Wealth builder", "Retirement age and future value") + li("scr", "u", "Users", "Plans and access (admin)") + li("upload", "", "Data and settings", "Load files, clear saved data") + "</div>" +
    '<div class="lab">Appearance</div>' + seg("mode", MODEV, [["light", "Light"], ["dark", "Dark"]]) +
    '<div class="lab">Language</div>' + seg("lang", LANG, [["en", "English"], ["fr", "Fran\u00E7ais"], ["nl", "Nederlands"]]) +
    '<div class="lab">Currency</div>' + seg("loc", LOC ? "1" : "0", [["0", "\u20AC (EUR)"], ["1", "Local currency"]]) +
    '<p class="note">Local currency shows prices, averages and results of each position in the currency it trades in. Portfolio totals stay in \u20AC.</p>';
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
var TITLES = { r: "My Portfolio", p: "Positions", t: "Transactions", d: "Dividends", m: "More", a: "Allocation", w: "Wealth builder", u: "Users" };
function nav() {
  var on = function (k) { return S.scr === k || (k === "m" && (S.scr === "w" || S.scr === "u")); };
  var b = function (k, l, p) { return '<button type="button" data-a="scr" data-v="' + k + '"' + (on(k) ? ' class="on" aria-current="page"' : "") + ">" + ic(p) + "<span>" + l + "</span></button>"; };
  return '<nav class="mb">' + b("r", "Returns", TABI.r) + b("p", "Positions", TABI.p) + b("a", "Allocation", TABI.a) + b("t", "Transactions", TABI.t) + b("d", "Dividends", TABI.d) + b("m", "More", I_MORE) + "</nav>";
}
function head() {
  var eye = '<button type="button" class="mib" data-a="hide" title="' + (HIDE ? "Show amounts" : "Hide amounts") + '" aria-label="' + (HIDE ? "Show amounts" : "Hide amounts") + '">' + (HIDE ? EYE_OFF : EYE) + "</button>";
  var up = '<button type="button" class="mib" data-a="upload" title="Load data and settings" aria-label="Load data and settings">' + ic(I_UP) + "</button>";
  return '<header class="mh"><h1>' + TITLES[S.scr] + '</h1><div class="mt">' + eye + up + "</div></header>";
}

function mRender() {
  var tl = g("tiles"), tx0 = tl ? tl.scrollLeft : 0, y = window.pageYOffset;
  var body;
  try {
    TAB = "praatdwu".indexOf(S.scr) >= 0 && S.scr !== "m" ? S.scr : "r";
    CH = [];
    if (S.scr === "m") body = vMore();
    else if (S.scr === "u") body = vUsers();
    else if (!rows.length) body = vEmpty();
    else if (S.scr === "r") body = vReturns();
    else if (S.scr === "p") body = vPositions();
    else if (S.scr === "a") body = vAlloc();
    else if (S.scr === "t") body = vTx();
    else if (S.scr === "d") body = vDiv();
    else if (S.scr === "w") body = vWealth();
    else body = vSoon(TITLES[S.scr]);
  } catch (e) {
    body = '<section class="card empty"><h2>Something went wrong</h2><p class="mu">' + esc(e && e.message || e) + "</p></section>";
    if (window.console) console.error(e);
  }
  g("m").innerHTML = head() + '<main class="mv">' + body + "</main>" + nav() + vSheet();
  if (window.dvFit) [].slice.call(M.querySelectorAll("svg.dv")).forEach(window.dvFit);
  var t2 = g("tiles");
  if (t2) { t2.scrollLeft = tx0; }
  ["tiles:dots", "dtiles:ddots", "utiles:udots"].forEach(function (z) { var p = z.split(":"); bindDots(p[0], p[1]); });
  if (S.scr === "w" && rows.length) wbRefresh();
  window.scrollTo(0, S.top ? 0 : y);
  S.top = false;
}
function bindDots(tid, did) {
  var t = g(tid);
  if (t) { t.addEventListener("scroll", function () { dotsFor(tid, did); }, { passive: true }); dotsFor(tid, did); }
}
function dotsFor(tid, did) {
  var t = g(tid), d = g(did);
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
window.DVFIT_NOSUM = true; /* the phone shows the chart summary as a line above the chart */

M.addEventListener("click", function (e) {
  var b = e.target.closest && e.target.closest("[data-a]");
  if (!b) return;
  var a = b.getAttribute("data-a"), v = b.getAttribute("data-v");
  if (a === "noop") return;
  if (a === "scr") { S.scr = v; S.sheet = null; S.top = true; mRender(); }
  else if (a === "pf") { PF = v; ls.set("pf", PF); mRender(); }
  else if (a === "pt") { PT = v; ls.set("pt", PT); mRender(); }
  else if (a === "tf") { TF = v; mRender(); }
  else if (a === "vm") { VM = v; mRender(); }
  else if (a === "costs") { MODE = MODE ? 0 : 1; calc(); }
  else if (a === "alsub") { S.al = v; mRender(); }
  else if (a === "ctf") { CTF = v; mRender(); }
  else if (a === "txv") { TXV = v; S.txN = 80; mRender(); }
  else if (a === "txf") { TXF = v; S.txN = 80; mRender(); }
  else if (a === "txo") { TXO = -TXO; mRender(); }
  else if (a === "txp") { TXS = v; mRender(); }
  else if (a === "txmore") { S.txN += 80; mRender(); }
  else if (a === "gv") { GV = v; mRender(); }
  else if (a === "gd") { GD = !GD; mRender(); }
  else if (a === "dvv") { S.dv = v; mRender(); }
  else if (a === "dvm") { DVM = v; mRender(); }
  else if (a === "dvp") { DVS = v; mRender(); }
  else if (a === "wm") { WB.mode = v; ls.set("wb", JSON.stringify(WB)); mRender(); }
  else if (a === "uadd") userAdd();
  else if (a === "udel") { USR = USR.filter(function (u) { return u.id !== v; }); saveUsers(); mRender(); }
  else if (a === "upl" || a === "ust") {
    var z = v.split("|"), u = USR.filter(function (x) { return x.id === z[0]; })[0];
    if (u) { if (a === "upl") u.plan = z[1]; else u.status = z[1]; saveUsers(); mRender(); }
  }
  else if (a === "alv") { ALV = v; mRender(); }
  else if (a === "hide") { setHide(!HIDE); if (!rows.length) mRender(); }
  else if (a === "upload") g("setup").hidden = false;
  else if (a === "ix") { S.sheet = "ix"; mRender(); }
  else if (a === "close") { S.sheet = null; mRender(); }
  else if (a === "ixpick") { S.sheet = null; mRender(); ixPick(v); }
  else if (a === "mode") { setLook(v); if (!rows.length) mRender(); }
  else if (a === "lang") setLang(v);
  else if (a === "loc") setLoc(v === "1");
  else if (a === "pcm") { MODE = +v; calc(); }
  else if (a === "row") {
    var pr = b.parentNode, o = !pr.classList.contains("open");
    pr.classList.toggle("open", o); b.setAttribute("aria-expanded", o ? "true" : "false"); S.open[v] = o;
  }
});
function userAdd() {
  var em = (g("uem").value || "").trim().toLowerCase(), nm = (g("unm").value || "").trim();
  S.uem = em; S.unm = nm; S.uerr = "";
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) S.uerr = "Enter a valid email address.";
  else if (USR.some(function (u) { return u.email === em; })) S.uerr = "That email is already in the list.";
  else {
    USR.push({ id: Date.now().toString(36), email: em, name: nm, plan: g("upm").value, status: "Active", joined: new Date().toISOString().slice(0, 10) });
    saveUsers(); S.uem = ""; S.unm = "";
  }
  mRender();
}
/* wealth builder inputs: same state and storage as the PC form, no full re-render while typing */
M.addEventListener("input", function (e) {
  var k = e.target.getAttribute && e.target.getAttribute("data-w");
  if (!k) return;
  WB[k] = e.target.type === "checkbox" ? e.target.checked : (parseFloat(e.target.value) || 0);
  if (k === "years" && g("wby")) g("wby").textContent = WB.years;
  ls.set("wb", JSON.stringify(WB));
  wbRefresh();
});
/* touch-drag and tap on charts and pie reuse the PC hover code */
M.addEventListener("pointermove", hov);
M.addEventListener("pointerdown", hov);

/* ---------- hook into app.js ---------- */
window.mRefresh = function () { mRender(); };
var origRender = window.render;
window.render = function (syms, bad, warn) {
  /* symbols that need fixing, data checks and holding detail still use the PC view */
  if ((bad && bad.length) || DBG || DET) {
    root.classList.add("m-fb");
    return origRender.apply(this, arguments);
  }
  root.classList.remove("m-fb");
  if (g("out").firstChild) g("out").innerHTML = ""; /* no hidden PC copy, so chart ids stay unique */
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

if (!root.classList.contains("m-fb") && g("out").firstChild) g("out").innerHTML = ""; /* PC render that ran before this file loaded */
VM = "p"; /* phone opens the Returns chart on Performance, as in the approved snapshot */
ALV = "t"; /* phone starts the allocation on Type, as in the approved snapshot */
mRender();
})();
