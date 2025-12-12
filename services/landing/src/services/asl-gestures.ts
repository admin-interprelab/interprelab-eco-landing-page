
import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

// define gestures
// A
const aSign = new GestureDescription('A');
aSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
aSign.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
for (const finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
    aSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
    aSign.addDirection(finger, FingerDirection.VerticalUp, 1.0);
}

// B
const bSign = new GestureDescription('B');
for (const finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
    bSign.addCurl(finger, FingerCurl.NoCurl, 1.0);
    bSign.addDirection(finger, FingerDirection.VerticalUp, 1.0);
}
bSign.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.9);

// C
const cSign = new GestureDescription('C');
for (const finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky, Finger.Thumb]) {
    cSign.addCurl(finger, FingerCurl.HalfCurl, 1.0);
    cSign.addDirection(finger, FingerDirection.HorizontalLeft, 1.0);
}

// D
const dSign = new GestureDescription('D');
dSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
dSign.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
for (const finger of [Finger.Middle, Finger.Ring, Finger.Pinky, Finger.Thumb]) {
    dSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
    dSign.addDirection(finger, FingerDirection.VerticalUp, 1.0);
}

// E
const eSign = new GestureDescription('E');
for (const finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky, Finger.Thumb]) {
    eSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
    eSign.addDirection(finger, FingerDirection.VerticalUp, 1.0);
}

// F
const fSign = new GestureDescription('F');
fSign.addCurl(Finger.Index, FingerCurl.FullCurl, 1.0);
fSign.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
for (const finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
    fSign.addCurl(finger, FingerCurl.NoCurl, 1.0);
    fSign.addDirection(finger, FingerDirection.VerticalUp, 1.0);
}
fSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
fSign.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);

// G
const gSign = new GestureDescription('G');
gSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
gSign.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 1.0);
for (const finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
    gSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
    gSign.addDirection(finger, FingerDirection.HorizontalLeft, 1.0);
}
gSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
gSign.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 1.0);

// H
const hSign = new GestureDescription('H');
hSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
hSign.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 1.0);
hSign.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
hSign.addDirection(Finger.Middle, FingerDirection.HorizontalLeft, 1.0);
for (const finger of [Finger.Ring, Finger.Pinky]) {
    hSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
    hSign.addDirection(finger, FingerDirection.HorizontalLeft, 1.0);
}
hSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
hSign.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 1.0);

// I
const iSign = new GestureDescription('I');
iSign.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
iSign.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 1.0);
for (const finger of [Finger.Index, Finger.Middle, Finger.Ring]) {
    iSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
    iSign.addDirection(finger, FingerDirection.VerticalUp, 1.0);
}
iSign.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.9);

// K
const kSign = new GestureDescription('K');
kSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
kSign.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
kSign.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
kSign.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0);
for (const finger of [Finger.Ring, Finger.Pinky]) {
    kSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
    kSign.addDirection(finger, FingerDirection.VerticalUp, 1.0);
}
kSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
kSign.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);

// L
const lSign = new GestureDescription('L');
lSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
lSign.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
lSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
lSign.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 1.0);
for (const finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
    lSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
    lSign.addDirection(finger, FingerDirection.VerticalUp, 1.0);
}

// M
const mSign = new GestureDescription('M');
for (const finger of [Finger.Index, Finger.Middle, Finger.Ring]) {
    mSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
    mSign.addDirection(finger, FingerDirection.VerticalDown, 1.0);
}
mSign.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
mSign.addDirection(Finger.Pinky, FingerDirection.VerticalDown, 1.0);
mSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
mSign.addDirection(Finger.Thumb, FingerDirection.VerticalDown, 1.0);

// N
const nSign = new GestureDescription('N');
for (const finger of [Finger.Index, Finger.Middle]) {
    nSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
    nSign.addDirection(finger, FingerDirection.VerticalDown, 1.0);
}
for (const finger of [Finger.Ring, Finger.Pinky]) {
    nSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
    nSign.addDirection(finger, FingerDirection.VerticalDown, 1.0);
}
nSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
nSign.addDirection(Finger.Thumb, FingerDirection.VerticalDown, 1.0);

// O
const oSign = new GestureDescription('O');
for (const finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky, Finger.Thumb]) {
    oSign.addCurl(finger, FingerCurl.HalfCurl, 1.0);
    oSign.addDirection(finger, FingerDirection.VerticalUp, 1.0);
}

// P
const pSign = new GestureDescription('P');
pSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
pSign.addDirection(Finger.Index, FingerDirection.VerticalDown, 1.0);
pSign.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
pSign.addDirection(Finger.Middle, FingerDirection.VerticalDown, 1.0);
for (const finger of [Finger.Ring, Finger.Pinky]) {
    pSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
    pSign.addDirection(finger, FingerDirection.VerticalDown, 1.0);
}
pSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
pSign.addDirection(Finger.Thumb, FingerDirection.VerticalDown, 1.0);

// Q
const qSign = new GestureDescription('Q');
qSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
qSign.addDirection(Finger.Index, FingerDirection.VerticalDown, 1.0);
qSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
qSign.addDirection(Finger.Thumb, FingerDirection.VerticalDown, 1.0);
for (const finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
    qSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
    qSign.addDirection(finger, FingerDirection.VerticalDown, 1.0);
}

// R
const rSign = new GestureDescription('R');
rSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
rSign.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
rSign.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
rSign.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0);
for (const finger of [Finger.Ring, Finger.Pinky]) {
    rSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
    rSign.addDirection(finger, FingerDirection.VerticalUp, 1.0);
}
rSign.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.9);

// S
const sSign = new GestureDescription('S');
for (const finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
    sSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
    sSign.addDirection(finger, FingerDirection.VerticalUp, 1.0);
}
sSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
sSign.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);

// T
const tSign = new GestureDescription('T');
tSign.addCurl(Finger.Index, FingerCurl.FullCurl, 1.0);
tSign.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
for (const finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
    tSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
    tSign.addDirection(finger, FingerDirection.VerticalUp, 1.0);
}
tSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
tSign.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);

// U
const uSign = new GestureDescription('U');
uSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
uSign.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
uSign.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
uSign.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0);
for (const finger of [Finger.Ring, Finger.Pinky]) {
    uSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
    uSign.addDirection(finger, FingerDirection.VerticalUp, 1.0);
}
uSign.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.9);

// V
const vSign = new GestureDescription('V');
vSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
vSign.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
vSign.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
vSign.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0);
for (const finger of [Finger.Ring, Finger.Pinky]) {
    vSign.addCurl(finger, FingerCurl.FullCurl, 0.9);
    vSign.addDirection(finger, FingerDirection.VerticalUp, 1.0);
}
vSign.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.9);

// W
const wSign = new GestureDescription('W');
for (const finger of [Finger.Index, Finger.Middle, Finger.Ring]) {
    wSign.addCurl(finger, FingerCurl.NoCurl, 1.0);
    wSign.addDirection(finger, FingerDirection.VerticalUp, 1.0);
}
wSign.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
wSign.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 1.0);
wSign.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.9);

// Y
const ySign = new GestureDescription('Y');
ySign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
ySign.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 1.0);
ySign.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
ySign.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 1.0);
for (const finger of [Finger.Index, Finger.Middle, Finger.Ring]) {
    ySign.addCurl(finger, FingerCurl.FullCurl, 1.0);
    ySign.addDirection(finger, FingerDirection.VerticalUp, 1.0);
}

export const gestures: GestureDescription[] = [
    aSign, bSign, cSign, dSign, eSign, fSign, gSign, hSign, iSign, kSign, lSign, mSign, nSign, oSign, pSign, qSign, rSign, sSign, tSign, uSign, vSign, wSign, ySign
];
