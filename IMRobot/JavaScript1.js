var window = {};
var navigator = {};
var TEA = {};
var btoa = {};
$ = window.$ || {};

$.RSA = function () {
    function t(t, i) {
        return new p(t, i)
    }
    function i(t, i) {
        if (i < t.length + 11) return uv_alert("Message too long for RSA"),
        null;
        for (var e = new Array,
        n = t.length - 1; n >= 0 && i > 0;) {
            var o = t.charCodeAt(n--);
            e[--i] = o
        }
        e[--i] = 0;
        for (var r = new Y,
        a = new Array; i > 2;) {
            for (a[0] = 0; 0 == a[0];) r.nextBytes(a);
            e[--i] = a[0]
        }
        return e[--i] = 2,
        e[--i] = 0,
        new p(e)
    }
    function e() {
        this.n = null,
        this.e = 0,
        this.d = null,
        this.p = null,
        this.q = null,
        this.dmp1 = null,
        this.dmq1 = null,
        this.coeff = null
    }
    function n(i, e) {
        null != i && null != e && i.length > 0 && e.length > 0 ? (this.n = t(i, 16), this.e = parseInt(e, 16)) : uv_alert("Invalid RSA public key")
    }
    function o(t) {
        return t.modPowInt(this.e, this.n)
    }
    function r(t) {
        var e = i(t, this.n.bitLength() + 7 >> 3);
        if (null == e) return null;
        var n = this.doPublic(e);
        if (null == n) return null;
        var o = n.toString(16);
        return 0 == (1 & o.length) ? o : "0" + o
    }
    function p(t, i, e) {
        null != t && ("number" == typeof t ? this.fromNumber(t, i, e) : null == i && "string" != typeof t ? this.fromString(t, 256) : this.fromString(t, i))
    }
    function a() {
        return new p(null)
    }
    function s(t, i, e, n, o, r) {
        for (; --r >= 0;) {
            var p = i * this[t++] + e[n] + o;
            o = Math.floor(p / 67108864),
            e[n++] = 67108863 & p
        }
        return o
    }
    function l(t, i, e, n, o, r) {
        for (var p = 32767 & i,
        a = i >> 15; --r >= 0;) {
            var s = 32767 & this[t],
            l = this[t++] >> 15,
            c = a * s + l * p;
            s = p * s + ((32767 & c) << 15) + e[n] + (1073741823 & o),
            o = (s >>> 30) + (c >>> 15) + a * l + (o >>> 30),
            e[n++] = 1073741823 & s
        }
        return o
    }
    function c(t, i, e, n, o, r) {
        for (var p = 16383 & i,
        a = i >> 14; --r >= 0;) {
            var s = 16383 & this[t],
            l = this[t++] >> 14,
            c = a * s + l * p;
            s = p * s + ((16383 & c) << 14) + e[n] + o,
            o = (s >> 28) + (c >> 14) + a * l,
            e[n++] = 268435455 & s
        }
        return o
    }
    function u(t) {
        return ut.charAt(t)
    }
    function g(t, i) {
        var e = gt[t.charCodeAt(i)];
        return null == e ? -1 : e
    }
    function d(t) {
        for (var i = this.t - 1; i >= 0; --i) t[i] = this[i];
        t.t = this.t,
        t.s = this.s
    }
    function h(t) {
        this.t = 1,
        this.s = 0 > t ? -1 : 0,
        t > 0 ? this[0] = t : -1 > t ? this[0] = t + DV : this.t = 0
    }
    function f(t) {
        var i = a();
        return i.fromInt(t),
        i
    }
    function m(t, i) {
        var e;
        if (16 == i) e = 4;
        else if (8 == i) e = 3;
        else if (256 == i) e = 8;
        else if (2 == i) e = 1;
        else if (32 == i) e = 5;
        else {
            if (4 != i) return void this.fromRadix(t, i);
            e = 2
        }
        this.t = 0,
        this.s = 0;
        for (var n = t.length,
        o = !1,
        r = 0; --n >= 0;) {
            var a = 8 == e ? 255 & t[n] : g(t, n);
            0 > a ? "-" == t.charAt(n) && (o = !0) : (o = !1, 0 == r ? this[this.t++] = a : r + e > this.DB ? (this[this.t - 1] |= (a & (1 << this.DB - r) - 1) << r, this[this.t++] = a >> this.DB - r) : this[this.t - 1] |= a << r, r += e, r >= this.DB && (r -= this.DB))
        }
        8 == e && 0 != (128 & t[0]) && (this.s = -1, r > 0 && (this[this.t - 1] |= (1 << this.DB - r) - 1 << r)),
        this.clamp(),
        o && p.ZERO.subTo(this, this)
    }
    function _() {
        for (var t = this.s & this.DM; this.t > 0 && this[this.t - 1] == t;)--this.t
    }
    function v(t) {
        if (this.s < 0) return "-" + this.negate().toString(t);
        var i;
        if (16 == t) i = 4;
        else if (8 == t) i = 3;
        else if (2 == t) i = 1;
        else if (32 == t) i = 5;
        else {
            if (4 != t) return this.toRadix(t);
            i = 2
        }
        var e, n = (1 << i) - 1,
        o = !1,
        r = "",
        p = this.t,
        a = this.DB - p * this.DB % i;
        if (p-- > 0) for (a < this.DB && (e = this[p] >> a) > 0 && (o = !0, r = u(e)) ; p >= 0;) i > a ? (e = (this[p] & (1 << a) - 1) << i - a, e |= this[--p] >> (a += this.DB - i)) : (e = this[p] >> (a -= i) & n, 0 >= a && (a += this.DB, --p)),
        e > 0 && (o = !0),
        o && (r += u(e));
        return o ? r : "0"
    }
    function $() {
        var t = a();
        return p.ZERO.subTo(this, t),
        t
    }
    function w() {
        return this.s < 0 ? this.negate() : this
    }
    function y(t) {
        var i = this.s - t.s;
        if (0 != i) return i;
        var e = this.t;
        if (i = e - t.t, 0 != i) return i;
        for (; --e >= 0;) if (0 != (i = this[e] - t[e])) return i;
        return 0
    }
    function k(t) {
        var i, e = 1;
        return 0 != (i = t >>> 16) && (t = i, e += 16),
        0 != (i = t >> 8) && (t = i, e += 8),
        0 != (i = t >> 4) && (t = i, e += 4),
        0 != (i = t >> 2) && (t = i, e += 2),
        0 != (i = t >> 1) && (t = i, e += 1),
        e
    }
    function b() {
        return this.t <= 0 ? 0 : this.DB * (this.t - 1) + k(this[this.t - 1] ^ this.s & this.DM)
    }
    function q(t, i) {
        var e;
        for (e = this.t - 1; e >= 0; --e) i[e + t] = this[e];
        for (e = t - 1; e >= 0; --e) i[e] = 0;
        i.t = this.t + t,
        i.s = this.s
    }
    function S(t, i) {
        for (var e = t; e < this.t; ++e) i[e - t] = this[e];
        i.t = Math.max(this.t - t, 0),
        i.s = this.s
    }
    function C(t, i) {
        var e, n = t % this.DB,
        o = this.DB - n,
        r = (1 << o) - 1,
        p = Math.floor(t / this.DB),
        a = this.s << n & this.DM;
        for (e = this.t - 1; e >= 0; --e) i[e + p + 1] = this[e] >> o | a,
        a = (this[e] & r) << n;
        for (e = p - 1; e >= 0; --e) i[e] = 0;
        i[p] = a,
        i.t = this.t + p + 1,
        i.s = this.s,
        i.clamp()
    }
    function T(t, i) {
        i.s = this.s;
        var e = Math.floor(t / this.DB);
        if (e >= this.t) return void (i.t = 0);
        var n = t % this.DB,
        o = this.DB - n,
        r = (1 << n) - 1;
        i[0] = this[e] >> n;
        for (var p = e + 1; p < this.t; ++p) i[p - e - 1] |= (this[p] & r) << o,
        i[p - e] = this[p] >> n;
        n > 0 && (i[this.t - e - 1] |= (this.s & r) << o),
        i.t = this.t - e,
        i.clamp()
    }
    function x(t, i) {
        for (var e = 0,
        n = 0,
        o = Math.min(t.t, this.t) ; o > e;) n += this[e] - t[e],
        i[e++] = n & this.DM,
        n >>= this.DB;
        if (t.t < this.t) {
            for (n -= t.s; e < this.t;) n += this[e],
            i[e++] = n & this.DM,
            n >>= this.DB;
            n += this.s
        } else {
            for (n += this.s; e < t.t;) n -= t[e],
            i[e++] = n & this.DM,
            n >>= this.DB;
            n -= t.s
        }
        i.s = 0 > n ? -1 : 0,
        -1 > n ? i[e++] = this.DV + n : n > 0 && (i[e++] = n),
        i.t = e,
        i.clamp()
    }
    function A(t, i) {
        var e = this.abs(),
        n = t.abs(),
        o = e.t;
        for (i.t = o + n.t; --o >= 0;) i[o] = 0;
        for (o = 0; o < n.t; ++o) i[o + e.t] = e.am(0, n[o], i, o, 0, e.t);
        i.s = 0,
        i.clamp(),
        this.s != t.s && p.ZERO.subTo(i, i)
    }
    function E(t) {
        for (var i = this.abs(), e = t.t = 2 * i.t; --e >= 0;) t[e] = 0;
        for (e = 0; e < i.t - 1; ++e) {
            var n = i.am(e, i[e], t, 2 * e, 0, 1); (t[e + i.t] += i.am(e + 1, 2 * i[e], t, 2 * e + 1, n, i.t - e - 1)) >= i.DV && (t[e + i.t] -= i.DV, t[e + i.t + 1] = 1)
        }
        t.t > 0 && (t[t.t - 1] += i.am(e, i[e], t, 2 * e, 0, 1)),
        t.s = 0,
        t.clamp()
    }
    function N(t, i, e) {
        var n = t.abs();
        if (!(n.t <= 0)) {
            var o = this.abs();
            if (o.t < n.t) return null != i && i.fromInt(0),
            void (null != e && this.copyTo(e));
            null == e && (e = a());
            var r = a(),
            s = this.s,
            l = t.s,
            c = this.DB - k(n[n.t - 1]);
            c > 0 ? (n.lShiftTo(c, r), o.lShiftTo(c, e)) : (n.copyTo(r), o.copyTo(e));
            var u = r.t,
            g = r[u - 1];
            if (0 != g) {
                var d = g * (1 << this.F1) + (u > 1 ? r[u - 2] >> this.F2 : 0),
                h = this.FV / d,
                f = (1 << this.F1) / d,
                m = 1 << this.F2,
                _ = e.t,
                v = _ - u,
                $ = null == i ? a() : i;
                for (r.dlShiftTo(v, $), e.compareTo($) >= 0 && (e[e.t++] = 1, e.subTo($, e)), p.ONE.dlShiftTo(u, $), $.subTo(r, r) ; r.t < u;) r[r.t++] = 0;
                for (; --v >= 0;) {
                    var w = e[--_] == g ? this.DM : Math.floor(e[_] * h + (e[_ - 1] + m) * f);
                    if ((e[_] += r.am(0, w, e, v, 0, u)) < w) for (r.dlShiftTo(v, $), e.subTo($, e) ; e[_] < --w;) e.subTo($, e)
                }
                null != i && (e.drShiftTo(u, i), s != l && p.ZERO.subTo(i, i)),
                e.t = u,
                e.clamp(),
                c > 0 && e.rShiftTo(c, e),
                0 > s && p.ZERO.subTo(e, e)
            }
        }
    }
    function L(t) {
        var i = a();
        return this.abs().divRemTo(t, null, i),
        this.s < 0 && i.compareTo(p.ZERO) > 0 && t.subTo(i, i),
        i
    }
    function P(t) {
        this.m = t
    }
    function B(t) {
        return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t
    }
    function Q(t) {
        return t
    }
    function D(t) {
        t.divRemTo(this.m, null, t)
    }
    function I(t, i, e) {
        t.multiplyTo(i, e),
        this.reduce(e)
    }
    function H(t, i) {
        t.squareTo(i),
        this.reduce(i)
    }
    function M() {
        if (this.t < 1) return 0;
        var t = this[0];
        if (0 == (1 & t)) return 0;
        var i = 3 & t;
        return i = i * (2 - (15 & t) * i) & 15,
        i = i * (2 - (255 & t) * i) & 255,
        i = i * (2 - ((65535 & t) * i & 65535)) & 65535,
        i = i * (2 - t * i % this.DV) % this.DV,
        i > 0 ? this.DV - i : -i
    }
    function V(t) {
        this.m = t,
        this.mp = t.invDigit(),
        this.mpl = 32767 & this.mp,
        this.mph = this.mp >> 15,
        this.um = (1 << t.DB - 15) - 1,
        this.mt2 = 2 * t.t
    }
    function U(t) {
        var i = a();
        return t.abs().dlShiftTo(this.m.t, i),
        i.divRemTo(this.m, null, i),
        t.s < 0 && i.compareTo(p.ZERO) > 0 && this.m.subTo(i, i),
        i
    }
    function O(t) {
        var i = a();
        return t.copyTo(i),
        this.reduce(i),
        i
    }
    function j(t) {
        for (; t.t <= this.mt2;) t[t.t++] = 0;
        for (var i = 0; i < this.m.t; ++i) {
            var e = 32767 & t[i],
            n = e * this.mpl + ((e * this.mph + (t[i] >> 15) * this.mpl & this.um) << 15) & t.DM;
            for (e = i + this.m.t, t[e] += this.m.am(0, n, t, i, 0, this.m.t) ; t[e] >= t.DV;) t[e] -= t.DV,
            t[++e]++
        }
        t.clamp(),
        t.drShiftTo(this.m.t, t),
        t.compareTo(this.m) >= 0 && t.subTo(this.m, t)
    }
    function R(t, i) {
        t.squareTo(i),
        this.reduce(i)
    }
    function F(t, i, e) {
        t.multiplyTo(i, e),
        this.reduce(e)
    }
    function z() {
        return 0 == (this.t > 0 ? 1 & this[0] : this.s)
    }
    function G(t, i) {
        if (t > 4294967295 || 1 > t) return p.ONE;
        var e = a(),
        n = a(),
        o = i.convert(this),
        r = k(t) - 1;
        for (o.copyTo(e) ; --r >= 0;) if (i.sqrTo(e, n), (t & 1 << r) > 0) i.mulTo(n, o, e);
        else {
            var s = e;
            e = n,
            n = s
        }
        return i.revert(e)
    }
    function X(t, i) {
        var e;
        return e = 256 > t || i.isEven() ? new P(i) : new V(i),
        this.exp(t, e)
    }
    function W(t) {
        ht[ft++] ^= 255 & t,
        ht[ft++] ^= t >> 8 & 255,
        ht[ft++] ^= t >> 16 & 255,
        ht[ft++] ^= t >> 24 & 255,
        ft >= vt && (ft -= vt)
    }
    function Z() {
        W((new Date).getTime())
    }
    function K() {
        if (null == dt) {
            for (Z(), dt = nt(), dt.init(ht), ft = 0; ft < ht.length; ++ft) ht[ft] = 0;
            ft = 0
        }
        return dt.next()
    }
    function J(t) {
        var i;
        for (i = 0; i < t.length; ++i) t[i] = K()
    }
    function Y() { }
    function tt() {
        this.i = 0,
        this.j = 0,
        this.S = new Array
    }
    function it(t) {
        var i, e, n;
        for (i = 0; 256 > i; ++i) this.S[i] = i;
        for (e = 0, i = 0; 256 > i; ++i) e = e + this.S[i] + t[i % t.length] & 255,
        n = this.S[i],
        this.S[i] = this.S[e],
        this.S[e] = n;
        this.i = 0,
        this.j = 0
    }
    function et() {
        var t;
        return this.i = this.i + 1 & 255,
        this.j = this.j + this.S[this.i] & 255,
        t = this.S[this.i],
        this.S[this.i] = this.S[this.j],
        this.S[this.j] = t,
        this.S[t + this.S[this.i] & 255]
    }
    function nt() {
        return new tt
    }
    function ot(t, i, n) {
        i = "F20CE00BAE5361F8FA3AE9CEFA495362FF7DA1BA628F64A347F0A8C012BF0B254A30CD92ABFFE7A6EE0DC424CB6166F8819EFA5BCCB20EDFB4AD02E412CCF579B1CA711D55B8B0B3AEB60153D5E0693A2A86F3167D7847A0CB8B00004716A9095D9BADC977CBB804DBDCBA6029A9710869A453F27DFDDF83C016D928B3CBF4C7",
        n = "3";
        var o = new e;
        return o.setPublic(i, n),
        o.encrypt(t)
    }
    e.prototype.doPublic = o,
    e.prototype.setPublic = n,
    e.prototype.encrypt = r;
    var rt, pt = 0xdeadbeefcafe,
    at = 15715070 == (16777215 & pt);
    at && "Microsoft Internet Explorer" == navigator.appName ? (p.prototype.am = l, rt = 30) : at && "Netscape" != navigator.appName ? (p.prototype.am = s, rt = 26) : (p.prototype.am = c, rt = 28),
    p.prototype.DB = rt,
    p.prototype.DM = (1 << rt) - 1,
    p.prototype.DV = 1 << rt;
    var st = 52;
    p.prototype.FV = Math.pow(2, st),
    p.prototype.F1 = st - rt,
    p.prototype.F2 = 2 * rt - st;
    var lt, ct, ut = "0123456789abcdefghijklmnopqrstuvwxyz",
    gt = new Array;
    for (lt = "0".charCodeAt(0), ct = 0; 9 >= ct; ++ct) gt[lt++] = ct;
    for (lt = "a".charCodeAt(0), ct = 10; 36 > ct; ++ct) gt[lt++] = ct;
    for (lt = "A".charCodeAt(0), ct = 10; 36 > ct; ++ct) gt[lt++] = ct;
    P.prototype.convert = B,
    P.prototype.revert = Q,
    P.prototype.reduce = D,
    P.prototype.mulTo = I,
    P.prototype.sqrTo = H,
    V.prototype.convert = U,
    V.prototype.revert = O,
    V.prototype.reduce = j,
    V.prototype.mulTo = F,
    V.prototype.sqrTo = R,
    p.prototype.copyTo = d,
    p.prototype.fromInt = h,
    p.prototype.fromString = m,
    p.prototype.clamp = _,
    p.prototype.dlShiftTo = q,
    p.prototype.drShiftTo = S,
    p.prototype.lShiftTo = C,
    p.prototype.rShiftTo = T,
    p.prototype.subTo = x,
    p.prototype.multiplyTo = A,
    p.prototype.squareTo = E,
    p.prototype.divRemTo = N,
    p.prototype.invDigit = M,
    p.prototype.isEven = z,
    p.prototype.exp = G,
    p.prototype.toString = v,
    p.prototype.negate = $,
    p.prototype.abs = w,
    p.prototype.compareTo = y,
    p.prototype.bitLength = b,
    p.prototype.mod = L,
    p.prototype.modPowInt = X,
    p.ZERO = f(0),
    p.ONE = f(1);
    var dt, ht, ft;
    if (null == ht) {
        ht = new Array,
        ft = 0;
        var mt;
        if ("Netscape" == navigator.appName && navigator.appVersion < "5" && window.crypto && window.crypto.random) {
            var _t = window.crypto.random(32);
            for (mt = 0; mt < _t.length; ++mt) ht[ft++] = 255 & _t.charCodeAt(mt)
        }
        for (; vt > ft;) mt = Math.floor(65536 * Math.random()),
        ht[ft++] = mt >>> 8,
        ht[ft++] = 255 & mt;
        ft = 0,
        Z()
    }
    Y.prototype.nextBytes = J,
    tt.prototype.init = it,
    tt.prototype.next = et;
    var vt = 256;
    return {
        rsa_encrypt: ot
    }
}();
(function (t) {
    function i() {
        return Math.round(4294967295 * Math.random())
    }
    function e(t, i, e) {
        (!e || e > 4) && (e = 4);
        for (var n = 0,
        o = i; i + e > o; o++) n <<= 8,
        n |= t[o];
        return (4294967295 & n) >>> 0
    }
    function n(t, i, e) {
        t[i + 3] = e >> 0 & 255,
        t[i + 2] = e >> 8 & 255,
        t[i + 1] = e >> 16 & 255,
        t[i + 0] = e >> 24 & 255
    }
    function o(t) {
        if (!t) return "";
        for (var i = "",
        e = 0; e < t.length; e++) {
            var n = Number(t[e]).toString(16);
            1 == n.length && (n = "0" + n),
            i += n
        }
        return i
    }
    function r(t) {
        for (var i = "",
        e = 0; e < t.length; e += 2) i += String.fromCharCode(parseInt(t.substr(e, 2), 16));
        return i
    }
    function p(t, i) {
        if (!t) return "";
        i && (t = a(t));
        for (var e = [], n = 0; n < t.length; n++) e[n] = t.charCodeAt(n);
        return o(e)
    }
    function a(t) {
        var i, e, n = [],
        o = t.length;
        for (i = 0; o > i; i++) e = t.charCodeAt(i),
        e > 0 && 127 >= e ? n.push(t.charAt(i)) : e >= 128 && 2047 >= e ? n.push(String.fromCharCode(192 | e >> 6 & 31), String.fromCharCode(128 | 63 & e)) : e >= 2048 && 65535 >= e && n.push(String.fromCharCode(224 | e >> 12 & 15), String.fromCharCode(128 | e >> 6 & 63), String.fromCharCode(128 | 63 & e));
        return n.join("")
    }
    function s(t) {
        _ = new Array(8),
        v = new Array(8),
        $ = w = 0,
        b = !0,
        m = 0;
        var e = t.length,
        n = 0;
        m = (e + 10) % 8,
        0 != m && (m = 8 - m),
        y = new Array(e + m + 10),
        _[0] = 255 & (248 & i() | m);
        for (var o = 1; m >= o; o++) _[o] = 255 & i();
        m++;
        for (var o = 0; 8 > o; o++) v[o] = 0;
        for (n = 1; 2 >= n;) 8 > m && (_[m++] = 255 & i(), n++),
        8 == m && c();
        for (var o = 0; e > 0;) 8 > m && (_[m++] = t[o++], e--),
        8 == m && c();
        for (n = 1; 7 >= n;) 8 > m && (_[m++] = 0, n++),
        8 == m && c();
        return y
    }
    function l(t) {
        var i = 0,
        e = new Array(8),
        n = t.length;
        if (k = t, n % 8 != 0 || 16 > n) return null;
        if (v = g(t), m = 7 & v[0], i = n - m - 10, 0 > i) return null;
        for (var o = 0; o < e.length; o++) e[o] = 0;
        y = new Array(i),
        w = 0,
        $ = 8,
        m++;
        for (var r = 1; 2 >= r;) if (8 > m && (m++, r++), 8 == m && (e = t, !d())) return null;
        for (var o = 0; 0 != i;) if (8 > m && (y[o] = 255 & (e[w + m] ^ v[m]), o++, i--, m++), 8 == m && (e = t, w = $ - 8, !d())) return null;
        for (r = 1; 8 > r; r++) {
            if (8 > m) {
                if (0 != (e[w + m] ^ v[m])) return null;
                m++
            }
            if (8 == m && (e = t, w = $, !d())) return null
        }
        return y
    }
    function c() {
        for (var t = 0; 8 > t; t++) _[t] ^= b ? v[t] : y[w + t];
        for (var i = u(_), t = 0; 8 > t; t++) y[$ + t] = i[t] ^ v[t],
        v[t] = _[t];
        w = $,
        $ += 8,
        m = 0,
        b = !1
    }
    function u(t) {
        for (var i = 16,
        o = e(t, 0, 4), r = e(t, 4, 4), p = e(f, 0, 4), a = e(f, 4, 4), s = e(f, 8, 4), l = e(f, 12, 4), c = 0, u = 2654435769; i-- > 0;) c += u,
        c = (4294967295 & c) >>> 0,
        o += (r << 4) + p ^ r + c ^ (r >>> 5) + a,
        o = (4294967295 & o) >>> 0,
        r += (o << 4) + s ^ o + c ^ (o >>> 5) + l,
        r = (4294967295 & r) >>> 0;
        var g = new Array(8);
        return n(g, 0, o),
        n(g, 4, r),
        g
    }
    function g(t) {
        for (var i = 16,
        o = e(t, 0, 4), r = e(t, 4, 4), p = e(f, 0, 4), a = e(f, 4, 4), s = e(f, 8, 4), l = e(f, 12, 4), c = 3816266640, u = 2654435769; i-- > 0;) r -= (o << 4) + s ^ o + c ^ (o >>> 5) + l,
        r = (4294967295 & r) >>> 0,
        o -= (r << 4) + p ^ r + c ^ (r >>> 5) + a,
        o = (4294967295 & o) >>> 0,
        c -= u,
        c = (4294967295 & c) >>> 0;
        var g = new Array(8);
        return n(g, 0, o),
        n(g, 4, r),
        g
    }
    function d() {
        for (var t = (k.length, 0) ; 8 > t; t++) v[t] ^= k[$ + t];
        return v = g(v),
        $ += 8,
        m = 0,
        !0
    }
    function h(t, i) {
        var e = [];
        if (i) for (var n = 0; n < t.length; n++) e[n] = 255 & t.charCodeAt(n);
        else for (var o = 0,
        n = 0; n < t.length; n += 2) e[o++] = parseInt(t.substr(n, 2), 16);
        return e
    }
    var f = "",
    m = 0,
    _ = [],
    v = [],
    $ = 0,
    w = 0,
    y = [],
    k = [],
    b = !0;
    t.TEA = {
        encrypt: function (t, i) {
            var e = h(t, i),
            n = s(e);
            return o(n)
        },
        enAsBase64: function (t, i) {
            for (var e = h(t, i), n = s(e), o = "", r = 0; r < n.length; r++) o += String.fromCharCode(n[r]);
            return btoa(o)
        },
        decrypt: function (t) {
            var i = h(t, !1),
            e = l(i);
            return o(e)
        },
        initkey: function (t, i) {
            f = h(t, i)
        },
        bytesToStr: r,
        strToBytes: p,
        bytesInStr: o,
        dataFromStr: h
    };
    var q = {};
    q.PADCHAR = "=",
    q.ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    q.getbyte = function (t, i) {
        var e = t.charCodeAt(i);
        if (e > 255) throw "INVALID_CHARACTER_ERR: DOM Exception 5";
        return e
    },
    q.encode = function (t) {
        if (1 != arguments.length) throw "SyntaxError: Not enough arguments";
        var i, e, n = q.PADCHAR,
        o = q.ALPHA,
        r = q.getbyte,
        p = [];
        t = "" + t;
        var a = t.length - t.length % 3;
        if (0 == t.length) return t;
        for (i = 0; a > i; i += 3) e = r(t, i) << 16 | r(t, i + 1) << 8 | r(t, i + 2),
        p.push(o.charAt(e >> 18)),
        p.push(o.charAt(e >> 12 & 63)),
        p.push(o.charAt(e >> 6 & 63)),
        p.push(o.charAt(63 & e));
        switch (t.length - a) {
            case 1:
                e = r(t, i) << 16,
                p.push(o.charAt(e >> 18) + o.charAt(e >> 12 & 63) + n + n);
                break;
            case 2:
                e = r(t, i) << 16 | r(t, i + 1) << 8,
                p.push(o.charAt(e >> 18) + o.charAt(e >> 12 & 63) + o.charAt(e >> 6 & 63) + n)
        }
        return p.join("")
    },
    window.btoa || (window.btoa = q.encode)
})(window);
$.Encryption = function () {
    function md5(t) {
        return hex_md5(t)
    }
    function hex_md5(t) {
        return binl2hex(core_md5(str2binl(t), t.length * chrsz))
    }
    function str_md5(t) {
        return binl2str(core_md5(str2binl(t), t.length * chrsz))
    }
    function hex_hmac_md5(t, i) {
        return binl2hex(core_hmac_md5(t, i))
    }
    function b64_hmac_md5(t, i) {
        return binl2b64(core_hmac_md5(t, i))
    }
    function str_hmac_md5(t, i) {
        return binl2str(core_hmac_md5(t, i))
    }
    function core_md5(t, i) {
        t[i >> 5] |= 128 << i % 32,
        t[(i + 64 >>> 9 << 4) + 14] = i;
        for (var e = 1732584193,
        n = -271733879,
        o = -1732584194,
        r = 271733878,
        p = 0; p < t.length; p += 16) {
            var a = e,
            s = n,
            l = o,
            c = r;
            e = md5_ff(e, n, o, r, t[p + 0], 7, -680876936),
            r = md5_ff(r, e, n, o, t[p + 1], 12, -389564586),
            o = md5_ff(o, r, e, n, t[p + 2], 17, 606105819),
            n = md5_ff(n, o, r, e, t[p + 3], 22, -1044525330),
            e = md5_ff(e, n, o, r, t[p + 4], 7, -176418897),
            r = md5_ff(r, e, n, o, t[p + 5], 12, 1200080426),
            o = md5_ff(o, r, e, n, t[p + 6], 17, -1473231341),
            n = md5_ff(n, o, r, e, t[p + 7], 22, -45705983),
            e = md5_ff(e, n, o, r, t[p + 8], 7, 1770035416),
            r = md5_ff(r, e, n, o, t[p + 9], 12, -1958414417),
            o = md5_ff(o, r, e, n, t[p + 10], 17, -42063),
            n = md5_ff(n, o, r, e, t[p + 11], 22, -1990404162),
            e = md5_ff(e, n, o, r, t[p + 12], 7, 1804603682),
            r = md5_ff(r, e, n, o, t[p + 13], 12, -40341101),
            o = md5_ff(o, r, e, n, t[p + 14], 17, -1502002290),
            n = md5_ff(n, o, r, e, t[p + 15], 22, 1236535329),
            e = md5_gg(e, n, o, r, t[p + 1], 5, -165796510),
            r = md5_gg(r, e, n, o, t[p + 6], 9, -1069501632),
            o = md5_gg(o, r, e, n, t[p + 11], 14, 643717713),
            n = md5_gg(n, o, r, e, t[p + 0], 20, -373897302),
            e = md5_gg(e, n, o, r, t[p + 5], 5, -701558691),
            r = md5_gg(r, e, n, o, t[p + 10], 9, 38016083),
            o = md5_gg(o, r, e, n, t[p + 15], 14, -660478335),
            n = md5_gg(n, o, r, e, t[p + 4], 20, -405537848),
            e = md5_gg(e, n, o, r, t[p + 9], 5, 568446438),
            r = md5_gg(r, e, n, o, t[p + 14], 9, -1019803690),
            o = md5_gg(o, r, e, n, t[p + 3], 14, -187363961),
            n = md5_gg(n, o, r, e, t[p + 8], 20, 1163531501),
            e = md5_gg(e, n, o, r, t[p + 13], 5, -1444681467),
            r = md5_gg(r, e, n, o, t[p + 2], 9, -51403784),
            o = md5_gg(o, r, e, n, t[p + 7], 14, 1735328473),
            n = md5_gg(n, o, r, e, t[p + 12], 20, -1926607734),
            e = md5_hh(e, n, o, r, t[p + 5], 4, -378558),
            r = md5_hh(r, e, n, o, t[p + 8], 11, -2022574463),
            o = md5_hh(o, r, e, n, t[p + 11], 16, 1839030562),
            n = md5_hh(n, o, r, e, t[p + 14], 23, -35309556),
            e = md5_hh(e, n, o, r, t[p + 1], 4, -1530992060),
            r = md5_hh(r, e, n, o, t[p + 4], 11, 1272893353),
            o = md5_hh(o, r, e, n, t[p + 7], 16, -155497632),
            n = md5_hh(n, o, r, e, t[p + 10], 23, -1094730640),
            e = md5_hh(e, n, o, r, t[p + 13], 4, 681279174),
            r = md5_hh(r, e, n, o, t[p + 0], 11, -358537222),
            o = md5_hh(o, r, e, n, t[p + 3], 16, -722521979),
            n = md5_hh(n, o, r, e, t[p + 6], 23, 76029189),
            e = md5_hh(e, n, o, r, t[p + 9], 4, -640364487),
            r = md5_hh(r, e, n, o, t[p + 12], 11, -421815835),
            o = md5_hh(o, r, e, n, t[p + 15], 16, 530742520),
            n = md5_hh(n, o, r, e, t[p + 2], 23, -995338651),
            e = md5_ii(e, n, o, r, t[p + 0], 6, -198630844),
            r = md5_ii(r, e, n, o, t[p + 7], 10, 1126891415),
            o = md5_ii(o, r, e, n, t[p + 14], 15, -1416354905),
            n = md5_ii(n, o, r, e, t[p + 5], 21, -57434055),
            e = md5_ii(e, n, o, r, t[p + 12], 6, 1700485571),
            r = md5_ii(r, e, n, o, t[p + 3], 10, -1894986606),
            o = md5_ii(o, r, e, n, t[p + 10], 15, -1051523),
            n = md5_ii(n, o, r, e, t[p + 1], 21, -2054922799),
            e = md5_ii(e, n, o, r, t[p + 8], 6, 1873313359),
            r = md5_ii(r, e, n, o, t[p + 15], 10, -30611744),
            o = md5_ii(o, r, e, n, t[p + 6], 15, -1560198380),
            n = md5_ii(n, o, r, e, t[p + 13], 21, 1309151649),
            e = md5_ii(e, n, o, r, t[p + 4], 6, -145523070),
            r = md5_ii(r, e, n, o, t[p + 11], 10, -1120210379),
            o = md5_ii(o, r, e, n, t[p + 2], 15, 718787259),
            n = md5_ii(n, o, r, e, t[p + 9], 21, -343485551),
            e = safe_add(e, a),
            n = safe_add(n, s),
            o = safe_add(o, l),
            r = safe_add(r, c)
        }
        return 16 == mode ? Array(n, o) : Array(e, n, o, r)
    }
    function md5_cmn(t, i, e, n, o, r) {
        return safe_add(bit_rol(safe_add(safe_add(i, t), safe_add(n, r)), o), e)
    }
    function md5_ff(t, i, e, n, o, r, p) {
        return md5_cmn(i & e | ~i & n, t, i, o, r, p)
    }
    function md5_gg(t, i, e, n, o, r, p) {
        return md5_cmn(i & n | e & ~n, t, i, o, r, p)
    }
    function md5_hh(t, i, e, n, o, r, p) {
        return md5_cmn(i ^ e ^ n, t, i, o, r, p)
    }
    function md5_ii(t, i, e, n, o, r, p) {
        return md5_cmn(e ^ (i | ~n), t, i, o, r, p)
    }
    function core_hmac_md5(t, i) {
        var e = str2binl(t);
        e.length > 16 && (e = core_md5(e, t.length * chrsz));
        for (var n = Array(16), o = Array(16), r = 0; 16 > r; r++) n[r] = 909522486 ^ e[r],
        o[r] = 1549556828 ^ e[r];
        var p = core_md5(n.concat(str2binl(i)), 512 + i.length * chrsz);
        return core_md5(o.concat(p), 640)
    }
    function safe_add(t, i) {
        var e = (65535 & t) + (65535 & i),
        n = (t >> 16) + (i >> 16) + (e >> 16);
        return n << 16 | 65535 & e
    }
    function bit_rol(t, i) {
        return t << i | t >>> 32 - i
    }
    function str2binl(t) {
        for (var i = Array(), e = (1 << chrsz) - 1, n = 0; n < t.length * chrsz; n += chrsz) i[n >> 5] |= (t.charCodeAt(n / chrsz) & e) << n % 32;
        return i
    }
    function binl2str(t) {
        for (var i = "",
        e = (1 << chrsz) - 1, n = 0; n < 32 * t.length; n += chrsz) i += String.fromCharCode(t[n >> 5] >>> n % 32 & e);
        return i
    }
    function binl2hex(t) {
        for (var i = hexcase ? "0123456789ABCDEF" : "0123456789abcdef", e = "", n = 0; n < 4 * t.length; n++) e += i.charAt(t[n >> 2] >> n % 4 * 8 + 4 & 15) + i.charAt(t[n >> 2] >> n % 4 * 8 & 15);
        return e
    }
    function binl2b64(t) {
        for (var i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        e = "",
        n = 0; n < 4 * t.length; n += 3) for (var o = (t[n >> 2] >> 8 * (n % 4) & 255) << 16 | (t[n + 1 >> 2] >> 8 * ((n + 1) % 4) & 255) << 8 | t[n + 2 >> 2] >> 8 * ((n + 2) % 4) & 255, r = 0; 4 > r; r++) e += 8 * n + 6 * r > 32 * t.length ? b64pad : i.charAt(o >> 6 * (3 - r) & 63);
        return e
    }
    function hexchar2bin(str) {
        for (var arr = [], i = 0; i < str.length; i += 2) arr.push("\\x" + str.substr(i, 2));
        return arr = arr.join(""),
        eval("var temp = '" + arr + "'"),
        temp
    }
    function __monitor(t, i) {
        if (!(Math.random() > (i || 1))) try {
            var e = location.protocol + "//ui.ptlogin2.qq.com/cgi-bin/report?id=" + t,
            n = document.createElement("img");
            n.src = e
        } catch (o) { }
    }
    function getEncryption(t, i, e, n) {
        e = e || "",
        t = t || "";
        for (var o = n ? t : md5(t), r = hexchar2bin(o), p = md5(r + i), a = $.RSA.rsa_encrypt(r), s = (a.length / 2).toString(16), l = TEA.strToBytes(e.toUpperCase(), !0), c = Number(l.length / 2).toString(16) ; c.length < 4;) c = "0" + c;
        for (; s.length < 4;) s = "0" + s;
        TEA.initkey(p);
        var u = TEA.enAsBase64(s + a + TEA.strToBytes(i) + c + l);
        return TEA.initkey(""),
        setTimeout(function () {
            __monitor(488358, 1)
        },
        0),
        u.replace(/[\/\+=]/g,
        function (t) {
            return {
                "/": "-",
                "+": "*",
                "=": "_"
            }[t]
        })
    }
    function getRSAEncryption(t, i, e) {
        var n = e ? t : md5(t),
        o = n + i.toUpperCase(),
        r = $.RSA.rsa_encrypt(o);
        return r
    }
    var hexcase = 1,
    b64pad = "",
    chrsz = 8,
    mode = 32;
    return {
        getEncryption: getEncryption,
        getRSAEncryption: getRSAEncryption,
        md5: md5
    }
}();