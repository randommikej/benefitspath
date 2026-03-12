import { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// GOOGLE SHEETS SETUP INSTRUCTIONS
// ─────────────────────────────────────────────────────────────────────────────
//
// STEP 1: Create a new Google Sheet.
//   Add these headers to Row 1, one per column:
//   Timestamp | Email | State | End Reason | Employment Length |
//   Application Status | Eligibility Score | Eligibility Likelihood |
//   Appeal: First Name | Appeal: Last Name | Appeal: Claim ID |
//   Appeal: Denial Date | Appeal: Was Layoff | Appeal: Term Reason |
//   Lawyer: Name | Lawyer: Phone | Lawyer: Email | Lawyer: Situation | Source
//
// STEP 2: In your Sheet, click Extensions → Apps Script.
//   Paste this entire function and save:
//
//   function doPost(e) {
//     var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
//     var data = JSON.parse(e.postData.contents);
//     sheet.appendRow([
//       data.timestamp, data.email, data.state, data.endReason,
//       data.employmentLength, data.applicationStatus,
//       data.eligibilityScore, data.eligibilityLikelihood,
//       data.appealFirstName, data.appealLastName, data.appealClaimId,
//       data.appealDenialDate, data.appealWasLayoff, data.appealTermReason,
//       data.lawyerName, data.lawyerPhone, data.lawyerEmail,
//       data.lawyerSituation, data.source
//     ]);
//     return ContentService
//       .createTextOutput(JSON.stringify({ result: "success" }))
//       .setMimeType(ContentService.MimeType.JSON);
//   }
//
// STEP 3: Click Deploy → New Deployment → Web App.
//   Execute as: Me | Who has access: Anyone
//   Copy the Web App URL and paste it below:
//
const SHEETS_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbwpTv9A45X3ZYee1mMnIuCeF89rVKofaqh0rVhQqiW2a8X-VfT147c4nLElxcdFgo2d7Q/exec";

async function submitToSheets(payload) {
  if (!SHEETS_WEBHOOK_URL || SHEETS_WEBHOOK_URL.includes("YOUR_APPS_SCRIPT")) return;
  try {
    await fetch(SHEETS_WEBHOOK_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        timestamp: new Date().toISOString(),
        source: "BenefitsPath",
      }),
    });
  } catch (err) {
    // Fail silently — never block the user experience
    console.warn("Sheet submission:", err);
  }
}

// ─── STATE DATA ───────────────────────────────────────────────────────────────
const STATE_DATA = {
  AL:{name:"Alabama",portal:"https://labor.alabama.gov/UC/",weeklyMax:275,appealDays:15,phone:"1-800-361-4524",avgWeeks:14},
  AK:{name:"Alaska",portal:"https://jobs.alaska.gov/RR/unemployment.htm",weeklyMax:370,appealDays:30,phone:"1-888-252-2557",avgWeeks:26},
  AZ:{name:"Arizona",portal:"https://des.az.gov/unemployment",weeklyMax:240,appealDays:15,phone:"1-877-600-2722",avgWeeks:20},
  AR:{name:"Arkansas",portal:"https://www.dws.arkansas.gov/unemployment/",weeklyMax:451,appealDays:20,phone:"1-800-422-7390",avgWeeks:16},
  CA:{name:"California",portal:"https://edd.ca.gov/unemployment/",weeklyMax:450,appealDays:30,phone:"1-800-300-5616",avgWeeks:26},
  CO:{name:"Colorado",portal:"https://cdle.colorado.gov/unemployment",weeklyMax:781,appealDays:20,phone:"1-303-318-9000",avgWeeks:26},
  CT:{name:"Connecticut",portal:"https://www.ct.gov/dol/unemployment",weeklyMax:760,appealDays:21,phone:"1-860-263-6000",avgWeeks:26},
  DE:{name:"Delaware",portal:"https://ui.delawareworks.com/",weeklyMax:400,appealDays:10,phone:"1-302-761-8446",avgWeeks:26},
  FL:{name:"Florida",portal:"https://connect.myflorida.com/",weeklyMax:275,appealDays:20,phone:"1-800-297-0586",avgWeeks:12},
  GA:{name:"Georgia",portal:"https://www.dol.georgia.gov/ui",weeklyMax:365,appealDays:15,phone:"1-877-709-8185",avgWeeks:14},
  HI:{name:"Hawaii",portal:"https://labor.hawaii.gov/ui/",weeklyMax:648,appealDays:20,phone:"1-808-586-8970",avgWeeks:26},
  ID:{name:"Idaho",portal:"https://www.labor.idaho.gov/dnn/Unemployment/",weeklyMax:448,appealDays:14,phone:"1-208-332-3570",avgWeeks:20},
  IL:{name:"Illinois",portal:"https://www2.illinois.gov/ides/",weeklyMax:742,appealDays:30,phone:"1-800-244-5631",avgWeeks:26},
  IN:{name:"Indiana",portal:"https://www.in.gov/dwd/unemployment/",weeklyMax:390,appealDays:18,phone:"1-800-891-6499",avgWeeks:26},
  IA:{name:"Iowa",portal:"https://www.iowaworkforcedevelopment.gov/unemployment-insurance",weeklyMax:531,appealDays:10,phone:"1-866-239-0843",avgWeeks:26},
  KS:{name:"Kansas",portal:"https://www.getkansasbenefits.gov/",weeklyMax:488,appealDays:16,phone:"1-785-296-5000",avgWeeks:16},
  KY:{name:"Kentucky",portal:"https://kewes.ky.gov/",weeklyMax:552,appealDays:15,phone:"1-502-564-2900",avgWeeks:26},
  LA:{name:"Louisiana",portal:"https://www.laworks.net/unemployment/",weeklyMax:247,appealDays:15,phone:"1-866-783-5567",avgWeeks:26},
  ME:{name:"Maine",portal:"https://www.maine.gov/unemployment/",weeklyMax:445,appealDays:15,phone:"1-800-593-7660",avgWeeks:26},
  MD:{name:"Maryland",portal:"https://www.dllr.state.md.us/employment/unemployment.shtml",weeklyMax:430,appealDays:15,phone:"1-410-949-0022",avgWeeks:26},
  MA:{name:"Massachusetts",portal:"https://www.mass.gov/unemployment",weeklyMax:1033,appealDays:10,phone:"1-617-626-6800",avgWeeks:30},
  MI:{name:"Michigan",portal:"https://www.michigan.gov/uia/",weeklyMax:362,appealDays:30,phone:"1-866-500-0017",avgWeeks:20},
  MN:{name:"Minnesota",portal:"https://www.uimn.org/",weeklyMax:857,appealDays:20,phone:"1-651-296-3644",avgWeeks:26},
  MS:{name:"Mississippi",portal:"https://www.mdes.ms.gov/",weeklyMax:235,appealDays:30,phone:"1-601-493-9427",avgWeeks:13},
  MO:{name:"Missouri",portal:"https://labor.mo.gov/unemployed-workers",weeklyMax:320,appealDays:30,phone:"1-800-320-2519",avgWeeks:20},
  MT:{name:"Montana",portal:"https://uid.dli.mt.gov/",weeklyMax:552,appealDays:10,phone:"1-406-444-2545",avgWeeks:28},
  NE:{name:"Nebraska",portal:"https://www.nebraska.gov/ui/index.cgi",weeklyMax:440,appealDays:20,phone:"1-402-458-2500",avgWeeks:26},
  NV:{name:"Nevada",portal:"https://detr.nv.gov/",weeklyMax:469,appealDays:11,phone:"1-775-684-0350",avgWeeks:26},
  NH:{name:"New Hampshire",portal:"https://www.nhes.nh.gov/",weeklyMax:427,appealDays:14,phone:"1-603-271-7700",avgWeeks:26},
  NJ:{name:"New Jersey",portal:"https://www.nj.gov/labor/myunemployment/",weeklyMax:830,appealDays:21,phone:"1-732-761-2020",avgWeeks:26},
  NM:{name:"New Mexico",portal:"https://www.dws.state.nm.us/unemployment/",weeklyMax:511,appealDays:10,phone:"1-877-664-6984",avgWeeks:26},
  NY:{name:"New York",portal:"https://labor.ny.gov/unemploymentassistance.shtm",weeklyMax:504,appealDays:30,phone:"1-888-209-8124",avgWeeks:26},
  NC:{name:"North Carolina",portal:"https://des.nc.gov/",weeklyMax:350,appealDays:30,phone:"1-888-737-0259",avgWeeks:12},
  ND:{name:"North Dakota",portal:"https://www.jobsnd.com/unemployment-individuals",weeklyMax:618,appealDays:15,phone:"1-701-328-4995",avgWeeks:26},
  OH:{name:"Ohio",portal:"https://unemployment.ohio.gov/",weeklyMax:647,appealDays:21,phone:"1-877-644-6562",avgWeeks:26},
  OK:{name:"Oklahoma",portal:"https://oklahoma.gov/oesc.html",weeklyMax:539,appealDays:10,phone:"1-405-525-1500",avgWeeks:26},
  OR:{name:"Oregon",portal:"https://unemployment.oregon.gov/",weeklyMax:783,appealDays:20,phone:"1-877-345-3484",avgWeeks:26},
  PA:{name:"Pennsylvania",portal:"https://www.uc.pa.gov/",weeklyMax:572,appealDays:21,phone:"1-888-313-7284",avgWeeks:26},
  RI:{name:"Rhode Island",portal:"https://dlt.ri.gov/individuals/unemployment-insurance",weeklyMax:617,appealDays:15,phone:"1-401-243-9100",avgWeeks:26},
  SC:{name:"South Carolina",portal:"https://dew.sc.gov/",weeklyMax:326,appealDays:10,phone:"1-866-831-1724",avgWeeks:20},
  SD:{name:"South Dakota",portal:"https://dlr.sd.gov/ra/individuals/default.aspx",weeklyMax:552,appealDays:15,phone:"1-605-626-2452",avgWeeks:26},
  TN:{name:"Tennessee",portal:"https://www.tn.gov/workforce/unemployment.html",weeklyMax:275,appealDays:15,phone:"1-844-224-5818",avgWeeks:26},
  TX:{name:"Texas",portal:"https://www.twc.texas.gov/unemployment-benefits",weeklyMax:563,appealDays:14,phone:"1-800-939-6631",avgWeeks:26},
  UT:{name:"Utah",portal:"https://jobs.utah.gov/ui/home",weeklyMax:649,appealDays:30,phone:"1-801-526-4400",avgWeeks:26},
  VT:{name:"Vermont",portal:"https://labor.vermont.gov/unemployment-insurance",weeklyMax:513,appealDays:10,phone:"1-877-214-3332",avgWeeks:26},
  VA:{name:"Virginia",portal:"https://www.vec.virginia.gov/unemployed/",weeklyMax:378,appealDays:30,phone:"1-866-832-2363",avgWeeks:26},
  WA:{name:"Washington",portal:"https://esd.wa.gov/unemployment",weeklyMax:1079,appealDays:30,phone:"1-800-318-6022",avgWeeks:26},
  WV:{name:"West Virginia",portal:"https://workforcewv.org/unemployment",weeklyMax:424,appealDays:14,phone:"1-800-379-1032",avgWeeks:26},
  WI:{name:"Wisconsin",portal:"https://dwd.wisconsin.gov/ui/",weeklyMax:370,appealDays:21,phone:"1-414-435-7069",avgWeeks:26},
  WY:{name:"Wyoming",portal:"https://www.wyomingworkforce.org/workers/ui/",weeklyMax:508,appealDays:30,phone:"1-307-473-3789",avgWeeks:26},
  DC:{name:"Washington D.C.",portal:"https://does.dc.gov/service/file-unemployment-claim",weeklyMax:444,appealDays:15,phone:"1-202-724-7000",avgWeeks:26},
};
const STATES = Object.entries(STATE_DATA).map(([code,d])=>({code,name:d.name})).sort((a,b)=>a.name.localeCompare(b.name));

function computeEligibility({endReason, employmentLength}) {
  let score = 0;
  if(endReason==="layoff") score=90;
  else if(endReason==="reduction") score=85;
  else if(endReason==="company_closed") score=95;
  else if(endReason==="contract_ended") score=70;
  else if(endReason==="fired") score=40;
  else if(endReason==="quit_good_cause") score=60;
  else if(endReason==="quit") score=15;
  if(employmentLength==="2plus") score=Math.min(score+15,98);
  else if(employmentLength==="1to2") score=Math.min(score+10,95);
  else if(employmentLength==="3to6") score=Math.max(score-15,5);
  else if(employmentLength==="under3") score=Math.max(score-30,5);
  let likelihood,message,color;
  if(score>=80){likelihood="High";color="#22c55e";message="You very likely qualify for unemployment benefits. Most people in your situation are approved."}
  else if(score>=55){likelihood="Moderate";color="#f59e0b";message="You may qualify. Your situation has some factors that typically lead to approval, though your state may review your case."}
  else if(score>=30){likelihood="Lower";color="#f97316";message="Qualifying may be harder in your situation, but it's worth applying. Many people in similar situations do receive benefits."}
  else{likelihood="Uncertain";color="#ef4444";message="Qualifying may be difficult, but you should still apply. Every case is reviewed individually and outcomes vary."}
  return {score,likelihood,color,message};
}

function generateAppealLetter(data) {
  const {firstName,lastName,state,ssn4,claimId,denialDate,termReason,userExplanation,startDate,endDate,wasLayoff}=data;
  const si=STATE_DATA[state]||{};
  const sn=si.name||state;
  const today=new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});
  return `${firstName} ${lastName}
[Your Address]
[City, State ZIP]
[Your Phone Number]
[Your Email Address]

${today}

Appeals Office
${sn} Department of Labor / Unemployment Insurance Division
[See official address at: ${si.portal||"your state's unemployment website"}]

RE: Appeal of Unemployment Benefits Denial
Claimant Name: ${firstName} ${lastName}
${ssn4?`Last 4 of SSN: ***-**-${ssn4}`:""}
${claimId?`Claim / Reference Number: ${claimId}`:""}
${denialDate?`Date of Denial Notice: ${denialDate}`:""}

Dear Appeals Officer,

I am writing to formally appeal the denial of my unemployment insurance benefits. I respectfully request that my claim be reconsidered and that I be granted a hearing to present my case.

BACKGROUND

I was employed from ${startDate||"[start date]"} to ${endDate||"[end date]"}. My employment ended due to ${wasLayoff==="yes"?"a layoff — a decision made by my employer, not by me":termReason||"circumstances beyond my control"}.

${userExplanation?`MY EXPLANATION\n\n${userExplanation}\n`:""}LEGAL BASIS FOR THIS APPEAL

Under ${sn}'s unemployment insurance statutes, individuals who lose employment through no fault of their own are generally entitled to unemployment benefits. The denial of my claim does not accurately reflect the circumstances of my separation from employment.

${wasLayoff==="yes"?`I was laid off — a circumstance entirely outside my control. Under established unemployment insurance law, employees who are laid off through no personal fault are eligible for benefits. I did not voluntarily leave my position, nor was I terminated for misconduct.`:`The reason cited for my denial does not accurately represent the facts of my situation. I was not discharged for misconduct as defined under ${sn} unemployment law. My actions were reasonable and consistent with the expectations of my role.`}

REQUEST

I respectfully request:
1. A full review of my unemployment insurance claim
2. An opportunity to present additional evidence and testimony at a formal hearing
3. Reconsideration of the denial in light of the facts stated above
4. Approval of all benefits owed from the date of my original claim

I am available to attend a hearing at the earliest convenience of the Appeals Office. Please contact me at the phone number or email listed above.

I have attached [list any supporting documents: separation notice, employer communications, performance reviews, etc.].

Thank you for your time and consideration.

Respectfully,


${firstName} ${lastName}
[Signature above printed name]

---
IMPORTANT: File this appeal within ${si.appealDays||30} days of your denial notice.
Submit to: ${si.portal||"your state's unemployment appeals office"}
`;
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --bg:#f7f5f0;--surface:#fff;--surface2:#f0ede6;--border:#e5e0d8;
  --text:#1a1714;--text2:#5a524a;--text3:#8a8078;
  --green:#2d6a4f;--gl:#d8f3dc;
  --amber:#92400e;--al:#fef3c7;
  --blue:#1e40af;--bl:#dbeafe;
  --accent:#c77c3c;
  --sh:0 1px 3px rgba(0,0,0,.08);--shm:0 4px 16px rgba(0,0,0,.08);
  --r:16px;--rs:10px;
}
html,body{height:100%;}
body{font-family:'DM Sans',system-ui,sans-serif;background:var(--bg);color:var(--text);font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased;}
.app{max-width:430px;margin:0 auto;min-height:100dvh;display:flex;flex-direction:column;overflow-y:auto;}
/* header */
.hdr{padding:16px 20px 12px;background:var(--bg);display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100;border-bottom:1px solid transparent;transition:border-color .2s;}
.hdr.sc{border-bottom-color:var(--border);background:rgba(247,245,240,.96);backdrop-filter:blur(8px);}
.logo{display:flex;align-items:center;gap:8px;cursor:pointer;}
.lmark{width:32px;height:32px;background:var(--green);border-radius:8px;display:flex;align-items:center;justify-content:center;}
.ltxt{font-family:'Instrument Serif',serif;font-size:17px;color:var(--text);}
.fbadge{background:var(--gl);color:var(--green);font-size:11px;font-weight:600;padding:3px 8px;border-radius:20px;}
/* progress */
.pbar{height:3px;background:var(--border);}
.pfill{height:100%;background:var(--green);transition:width .4s cubic-bezier(.4,0,.2,1);}
/* screen */
.scr{flex:1;padding:24px 20px 40px;animation:fu .3s ease;}
@keyframes fu{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
/* hero */
.eyebrow{font-size:12px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--accent);margin-bottom:12px;}
.htitle{font-family:'Instrument Serif',serif;font-size:36px;line-height:1.15;margin-bottom:14px;}
.htitle em{font-style:italic;color:var(--green);}
.hsub{font-size:16px;color:var(--text2);line-height:1.6;margin-bottom:28px;}
.hfeats{display:flex;flex-direction:column;gap:10px;margin-bottom:32px;}
.hfeat{display:flex;align-items:center;gap:10px;font-size:14px;color:var(--text2);}
.hdot{width:20px;height:20px;background:var(--gl);border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;}
/* trust */
.trust{background:var(--surface2);border-radius:var(--r);padding:16px;margin-bottom:24px;}
.tlbl{font-size:12px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:12px;}
.titems{display:flex;gap:16px;justify-content:space-between;}
.titem{text-align:center;flex:1;}
.tnum{font-family:'Instrument Serif',serif;font-size:22px;color:var(--green);}
.tsub{font-size:11px;color:var(--text3);line-height:1.3;margin-top:2px;}
/* buttons */
.btn{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:16px;border-radius:var(--r);font-size:16px;font-weight:600;font-family:inherit;cursor:pointer;border:none;transition:all .15s;text-decoration:none;-webkit-tap-highlight-color:transparent;}
.btn:active{transform:scale(.98);}
.bp{background:var(--green);color:#fff;box-shadow:0 4px 14px rgba(45,106,79,.3);}
.bp:hover{background:#236040;}
.bs{background:var(--surface);color:var(--text);border:1.5px solid var(--border);}
.bog{background:transparent;color:var(--green);border:1.5px solid var(--green);}
.bsm{padding:10px 16px;font-size:14px;width:auto;}
.bamb{background:#d97706;color:#fff;box-shadow:0 4px 14px rgba(217,119,6,.3);}
.bblu{background:#1e40af;color:#fff;box-shadow:0 4px 14px rgba(30,64,175,.3);}
/* q card */
.qlbl{font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:var(--text3);margin-bottom:8px;}
.qtitle{font-family:'Instrument Serif',serif;font-size:26px;line-height:1.25;margin-bottom:8px;}
.qsub{font-size:14px;color:var(--text2);margin-bottom:24px;}
.opts{display:flex;flex-direction:column;gap:10px;}
.opt{display:flex;align-items:center;gap:14px;padding:16px;background:var(--surface);border:1.5px solid var(--border);border-radius:var(--rs);cursor:pointer;transition:all .15s;-webkit-tap-highlight-color:transparent;}
.opt:active{transform:scale(.99);}
.opt.sel{border-color:var(--green);background:#f0faf4;}
.oico{width:40px;height:40px;border-radius:10px;background:var(--surface2);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;}
.opt.sel .oico{background:var(--gl);}
.otxt{flex:1;}
.olbl{font-size:15px;font-weight:500;}
.odsc{font-size:13px;color:var(--text3);margin-top:2px;}
.ochk{width:20px;height:20px;border-radius:50%;border:1.5px solid var(--border);flex-shrink:0;display:flex;align-items:center;justify-content:center;transition:all .15s;}
.opt.sel .ochk{background:var(--green);border-color:var(--green);}
.opt.sel .ochk::after{content:'';width:6px;height:6px;border-radius:50%;background:#fff;}
/* select */
.swrap{position:relative;margin-bottom:20px;}
.swrap select{width:100%;padding:14px 40px 14px 16px;border:1.5px solid var(--border);border-radius:var(--rs);background:var(--surface);font-family:inherit;font-size:15px;color:var(--text);appearance:none;cursor:pointer;outline:none;transition:border-color .15s;}
.swrap select:focus{border-color:var(--green);}
.sarr{position:absolute;right:14px;top:50%;transform:translateY(-50%);pointer-events:none;color:var(--text3);}
/* inputs */
.inp{width:100%;padding:14px 16px;border:1.5px solid var(--border);border-radius:var(--rs);font-family:inherit;font-size:15px;color:var(--text);background:var(--surface);outline:none;transition:border-color .15s;}
.inp:focus{border-color:var(--green);}
.ta{min-height:120px;resize:vertical;}
.ilbl{font-size:13px;font-weight:500;color:var(--text2);margin-bottom:6px;display:block;}
.ig{margin-bottom:16px;}
.ihint{font-size:12px;color:var(--text3);margin-top:4px;}
/* result */
.rcrd{background:var(--surface);border-radius:var(--r);padding:24px;box-shadow:var(--shm);margin-bottom:20px;}
.rmeter{display:flex;align-items:center;gap:16px;margin-bottom:20px;}
.rcirc{width:72px;height:72px;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;flex-shrink:0;}
.rpct{font-family:'Instrument Serif',serif;font-size:22px;}
.rlbl2{font-size:9px;font-weight:600;text-transform:uppercase;letter-spacing:.04em;opacity:.8;}
.rlik{font-family:'Instrument Serif',serif;font-size:24px;}
.rlsub{font-size:13px;color:var(--text2);margin-top:2px;}
.rmsg{font-size:15px;color:var(--text2);line-height:1.6;border-top:1px solid var(--border);padding-top:16px;}
/* info card */
.ic{background:var(--surface);border-radius:var(--r);padding:20px;box-shadow:var(--sh);margin-bottom:16px;border-left:3px solid var(--green);}
.ic.amb{border-left-color:#f59e0b;}
.ict{font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:var(--text3);margin-bottom:6px;}
.icv{font-size:18px;font-weight:600;color:var(--text);}
.ics{font-size:13px;color:var(--text2);margin-top:4px;}
/* steps */
.steps{display:flex;flex-direction:column;}
.step{display:flex;gap:14px;padding-bottom:20px;position:relative;}
.step:not(:last-child)::after{content:'';position:absolute;left:15px;top:32px;width:2px;bottom:0;background:var(--border);}
.snum{width:32px;height:32px;border-radius:50%;background:var(--green);color:#fff;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;flex-shrink:0;z-index:1;}
.sbdy{flex:1;padding-top:4px;}
.stit{font-size:15px;font-weight:600;margin-bottom:4px;}
.sdsc{font-size:13px;color:var(--text2);line-height:1.5;}
/* section */
.sectit{font-family:'Instrument Serif',serif;font-size:22px;margin-bottom:6px;}
.secsub{font-size:14px;color:var(--text2);margin-bottom:20px;line-height:1.5;}
/* letter */
.ltrbox{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:20px;font-family:'Courier New',monospace;font-size:12px;line-height:1.7;color:var(--text);white-space:pre-wrap;max-height:320px;overflow-y:auto;margin-bottom:16px;}
.ltract{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;}
/* lawyer */
.lhero{background:linear-gradient(135deg,#1e3a5f 0%,#1e40af 100%);border-radius:var(--r);padding:24px;color:#fff;margin-bottom:20px;}
.lhtit{font-family:'Instrument Serif',serif;font-size:24px;margin-bottom:8px;}
.lhsub{font-size:14px;opacity:.85;line-height:1.6;}
.rlist{display:flex;flex-direction:column;gap:10px;margin-bottom:20px;}
.ritem{display:flex;gap:12px;align-items:flex-start;padding:14px;background:var(--bl);border-radius:var(--rs);}
.rico{font-size:18px;flex-shrink:0;}
.rtxt{font-size:14px;color:var(--blue);line-height:1.5;}
.rtxt strong{display:block;margin-bottom:2px;}
/* nav */
.bkbtn{display:flex;align-items:center;gap:6px;color:var(--text3);font-size:14px;cursor:pointer;padding:0;background:none;border:none;font-family:inherit;margin-bottom:20px;-webkit-tap-highlight-color:transparent;}
.bkbtn:hover{color:var(--text);}
.bnav{position:sticky;bottom:0;padding:12px 20px 24px;background:var(--bg);border-top:1px solid var(--border);display:flex;gap:10px;flex-direction:column;}
/* banners */
.fbanner{background:var(--gl);border-radius:var(--rs);padding:12px 16px;display:flex;align-items:center;gap:10px;margin-bottom:20px;}
.fbtxt{font-size:13px;color:var(--green);font-weight:500;}
.dbox{background:var(--al);border-radius:var(--r);padding:20px;margin-bottom:20px;border:1px solid #fcd34d;}
.dboxt{font-size:15px;font-weight:600;color:var(--amber);margin-bottom:6px;}
.dboxb{font-size:14px;color:#78350f;line-height:1.6;}
/* chips */
.chips{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px;}
.chip{padding:6px 14px;border-radius:20px;font-size:13px;font-weight:500;cursor:pointer;border:1.5px solid var(--border);background:var(--surface);transition:all .15s;-webkit-tap-highlight-color:transparent;}
.chip.on{background:var(--green);color:#fff;border-color:var(--green);}
/* misc */
.dvdr{display:flex;align-items:center;gap:12px;margin:20px 0;color:var(--text3);font-size:13px;}
.dvdr::before,.dvdr::after{content:'';flex:1;height:1px;background:var(--border);}
.hnote{background:var(--surface2);border-radius:var(--rs);padding:12px 14px;font-size:13px;color:var(--text2);line-height:1.5;margin-bottom:16px;}
.hnote strong{color:var(--text);}
.cpyok{font-size:13px;color:var(--green);font-weight:500;text-align:center;padding:8px;animation:fu .3s ease;}
.plink{display:flex;align-items:center;justify-content:space-between;padding:16px;background:var(--surface);border:1.5px solid var(--border);border-radius:var(--rs);text-decoration:none;color:var(--text);margin-bottom:10px;transition:all .15s;}
.plink:hover{border-color:var(--green);background:#f0faf4;}
.plink-l{display:flex;align-items:center;gap:12px;}
.plico{width:36px;height:36px;background:var(--gl);border-radius:8px;display:flex;align-items:center;justify-content:center;}
@media(min-width:431px){.app{border-left:1px solid var(--border);border-right:1px solid var(--border);box-shadow:0 0 60px rgba(0,0,0,.06);}}
/* email capture */
.ehero{background:linear-gradient(160deg,#f0faf4 0%,#e8f5e9 100%);border-radius:var(--r);padding:28px 24px;margin-bottom:24px;border:1px solid #c8e6c9;}
.eemoji{font-size:36px;margin-bottom:12px;}
.etitle{font-family:'Instrument Serif',serif;font-size:26px;line-height:1.2;margin-bottom:8px;}
.esub{font-size:14px;color:var(--text2);line-height:1.6;}
.eperks{display:flex;flex-direction:column;gap:10px;margin-bottom:20px;}
.eperk{display:flex;align-items:flex-start;gap:10px;font-size:14px;color:var(--text2);}
.epico{width:22px;height:22px;background:var(--gl);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;font-size:11px;}
.pvlink{color:var(--text3);font-size:12px;text-decoration:underline;cursor:pointer;background:none;border:none;font-family:inherit;padding:0;}
.pvlink:hover{color:var(--text2);}
.skip{color:var(--text3);font-size:13px;text-decoration:underline;cursor:pointer;background:none;border:none;font-family:inherit;padding:8px;text-align:center;width:100%;}
/* spinner */
.subm{display:flex;align-items:center;gap:10px;font-size:14px;color:var(--text3);padding:12px 0;justify-content:center;}
@keyframes spin{to{transform:rotate(360deg)}}
.spin{width:16px;height:16px;border:2px solid var(--border);border-top-color:var(--green);border-radius:50%;animation:spin .7s linear infinite;}
/* privacy */
.psec{margin-bottom:24px;}
.psec h3{font-size:15px;font-weight:600;color:var(--text);margin-bottom:8px;}
.psec p,.psec li{font-size:14px;color:var(--text2);line-height:1.7;}
.psec ul{padding-left:18px;display:flex;flex-direction:column;gap:4px;}
.peff{font-size:12px;color:var(--text3);margin-bottom:28px;}
`;

// ─── ICONS ────────────────────────────────────────────────────────────────────
const Chk = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const Arr = ({s=16}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
const ArrL = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>;
const Shld = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const Ext = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>;
const Cpy = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>;
const Prt = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>;
const Mlico = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const GlobeIco = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
const CvDown = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>;

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("home");
  const [prevScreen, setPrevScreen] = useState("home");
  const [answers, setAnswers] = useState({});
  const [aData, setAData] = useState({});  // appeal form data
  const [letter, setLetter] = useState("");
  const [cpyOk, setCpyOk] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lForm, setLForm] = useState({ name:"", phone:"", email:"", situation:"" });
  const [lSent, setLSent] = useState(false);
  const [emailVal, setEmailVal] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const si = answers.state ? STATE_DATA[answers.state] : null;
  const elig = answers.state && answers.endReason && answers.employmentLength
    ? computeEligibility(answers) : null;

  const stepMap = {
    home:0, state:1, situation:2, employment:3, applied:4,
    email_capture:5, result:6, forms:6,
    appeal_intro:6, appeal_form:6, appeal_letter:6, lawyer:6, privacy:6
  };
  const progress = ((stepMap[screen]||0)/6)*100;

  const go = (s) => {
    setPrevScreen(screen);
    setScreen(s);
    document.querySelector(".app")?.scrollTo(0,0);
  };

  const sheetPayload = (extra={}) => ({
    email: answers.email || extra.email || "(not provided)",
    state: answers.state||"",
    endReason: answers.endReason||"",
    employmentLength: answers.employmentLength||"",
    applicationStatus: answers.applicationStatus||"",
    eligibilityScore: elig?.score||"",
    eligibilityLikelihood: elig?.likelihood||"",
    appealFirstName: aData.firstName||"",
    appealLastName: aData.lastName||"",
    appealClaimId: aData.claimId||"",
    appealDenialDate: aData.denialDate||"",
    appealWasLayoff: aData.wasLayoff||"",
    appealTermReason: aData.termReason||"",
    lawyerName: lForm.name||"",
    lawyerPhone: lForm.phone||"",
    lawyerEmail: lForm.email||"",
    lawyerSituation: lForm.situation||"",
    ...extra
  });

  const handleEmailSubmit = async () => {
    setSubmitting(true);
    setAnswers(a => ({...a, email: emailVal}));
    await submitToSheets(sheetPayload({ email: emailVal }));
    setSubmitting(false);
    go("result");
  };

  const handleEmailSkip = async () => {
    await submitToSheets(sheetPayload({ email: "(skipped)" }));
    go("result");
  };

  const handleGenerateLetter = async () => {
    const l = generateAppealLetter({...answers, ...aData});
    setLetter(l);
    await submitToSheets(sheetPayload());
    go("appeal_letter");
  };

  const handleLawyerSubmit = async () => {
    await submitToSheets(sheetPayload({ lawyerName:lForm.name, lawyerPhone:lForm.phone, lawyerEmail:lForm.email, lawyerSituation:lForm.situation }));
    setLSent(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(letter).then(() => { setCpyOk(true); setTimeout(()=>setCpyOk(false),2000); });
  };
  const handlePrint = () => {
    const w = window.open("","_blank");
    w.document.write(`<pre style="font-family:monospace;font-size:12px;padding:40px;white-space:pre-wrap">${letter}</pre>`);
    w.document.close(); w.print();
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html:CSS}}/>
      <div className="app" onScroll={e=>setScrolled(e.target.scrollTop>4)}>

        {/* HEADER */}
        <header className={`hdr${scrolled?" sc":""}`}>
          <div className="logo" onClick={()=>go("home")}>
            <div className="lmark"><Shld/></div>
            <span className="ltxt">BenefitsPath</span>
          </div>
          <span className="fbadge">100% Free</span>
        </header>
        <div className="pbar"><div className="pfill" style={{width:`${progress}%`}}/></div>

        {/* ── HOME ── */}
        {screen==="home"&&(
          <div className="scr">
            <div style={{padding:"12px 0 28px"}}>
              <div className="eyebrow">Benefits Navigator</div>
              <h1 className="htitle">Lost your job?<br/>We'll help you figure out <em>what to do next.</em></h1>
              <p className="hsub">Answer a few quick questions and we'll guide you to the right benefits, forms, and support — completely free.</p>
              <div className="hfeats">
                {[["Check if you qualify","Takes about 2 minutes"],["Get your state's forms & links","Direct to official portals"],["Generate an appeal letter","If your claim was denied"],["Connect with a lawyer","If you think you were wronged"]].map(([l,d])=>(
                  <div className="hfeat" key={l}><div className="hdot"><Chk/></div><div><strong style={{color:"var(--text)",fontSize:14}}>{l}</strong> — <span style={{fontSize:13}}>{d}</span></div></div>
                ))}
              </div>
              <button className="btn bp" onClick={()=>go("state")}>Check Your Benefits <Arr s={18}/></button>
            </div>
            <div className="trust">
              <div className="tlbl">Who we help</div>
              <div className="titems">
                {[["50","States covered"],["Free","Always, forever"],["5 min","Average check time"]].map(([n,l])=>(
                  <div className="titem" key={l}><div className="tnum">{n}</div><div className="tsub">{l}</div></div>
                ))}
              </div>
            </div>
            <div className="fbanner"><Shld/><p className="fbtxt">This service costs nothing. Access to benefits information should be simple and free for everyone.</p></div>
            <div className="dvdr">or jump to</div>
            <button className="btn bs" style={{marginBottom:10}} onClick={()=>go("appeal_intro")}>✉️ Generate an Appeal Letter</button>
            <button className="btn bs" style={{marginBottom:16}} onClick={()=>go("lawyer")}>⚖️ Talk to an Employment Lawyer</button>
            <button className="skip" onClick={()=>go("privacy")}>Privacy Policy</button>
          </div>
        )}

        {/* ── STATE ── */}
        {screen==="state"&&(
          <div className="scr">
            <button className="bkbtn" onClick={()=>go("home")}><ArrL/> Back</button>
            <div className="qlbl">Step 1 of 5</div>
            <h2 className="qtitle">What state did you work in?</h2>
            <p className="qsub">We'll find the right benefits rules and links for your state.</p>
            <div className="swrap">
              <select value={answers.state||""} onChange={e=>setAnswers(a=>({...a,state:e.target.value}))}>
                <option value="">Select your state…</option>
                {STATES.map(s=><option key={s.code} value={s.code}>{s.name}</option>)}
              </select>
              <div className="sarr"><CvDown/></div>
            </div>
            {answers.state&&(
              <div className="ic" style={{marginBottom:20}}>
                <div className="ict">Selected</div>
                <div className="icv">{STATE_DATA[answers.state]?.name}</div>
                <div className="ics">Max weekly: <strong>${STATE_DATA[answers.state]?.weeklyMax?.toLocaleString()}</strong> · Up to <strong>{STATE_DATA[answers.state]?.avgWeeks} weeks</strong></div>
              </div>
            )}
            <div className="bnav">
              <button className="btn bp" disabled={!answers.state} onClick={()=>go("situation")} style={{opacity:answers.state?1:.4}}>Continue <Arr s={18}/></button>
            </div>
          </div>
        )}

        {/* ── SITUATION ── */}
        {screen==="situation"&&(
          <div className="scr">
            <button className="bkbtn" onClick={()=>go("state")}><ArrL/> Back</button>
            <div className="qlbl">Step 2 of 5</div>
            <h2 className="qtitle">How did your job end?</h2>
            <p className="qsub">This is the most important factor in your eligibility.</p>
            <div className="opts">
              {[
                {v:"layoff",i:"📦",l:"Laid off",d:"Employer reduced workforce or eliminated my position"},
                {v:"company_closed",i:"🏢",l:"Company closed or downsized",d:"Business shut down or had major cuts"},
                {v:"reduction",i:"✂️",l:"Hours reduced significantly",d:"Part-time or major reduction in hours"},
                {v:"contract_ended",i:"📋",l:"Contract or temp job ended",d:"My assignment or contract was not renewed"},
                {v:"fired",i:"⚠️",l:"Fired or terminated",d:"Employer ended my employment"},
                {v:"quit_good_cause",i:"🚪",l:"Quit with good cause",d:"Unsafe conditions, harassment, or major job change"},
                {v:"quit",i:"👋",l:"Quit voluntarily",d:"I chose to leave"},
              ].map(o=>(
                <div key={o.v} className={`opt${answers.endReason===o.v?" sel":""}`} onClick={()=>setAnswers(a=>({...a,endReason:o.v}))}>
                  <div className="oico">{o.i}</div>
                  <div className="otxt"><div className="olbl">{o.l}</div><div className="odsc">{o.d}</div></div>
                  <div className="ochk"/>
                </div>
              ))}
            </div>
            <div className="bnav">
              <button className="btn bp" disabled={!answers.endReason} onClick={()=>go("employment")} style={{opacity:answers.endReason?1:.4}}>Continue <Arr s={18}/></button>
            </div>
          </div>
        )}

        {/* ── EMPLOYMENT ── */}
        {screen==="employment"&&(
          <div className="scr">
            <button className="bkbtn" onClick={()=>go("situation")}><ArrL/> Back</button>
            <div className="qlbl">Step 3 of 5</div>
            <h2 className="qtitle">How long were you at this job?</h2>
            <p className="qsub">Most states require a minimum amount of work history.</p>
            <div className="opts">
              {[{v:"under3",l:"Less than 3 months",i:"🌱"},{v:"3to6",l:"3–6 months",i:"📅"},{v:"6to12",l:"6–12 months",i:"🗓️"},{v:"1to2",l:"1–2 years",i:"⏳"},{v:"2plus",l:"More than 2 years",i:"🏆"}].map(o=>(
                <div key={o.v} className={`opt${answers.employmentLength===o.v?" sel":""}`} onClick={()=>setAnswers(a=>({...a,employmentLength:o.v}))}>
                  <div className="oico">{o.i}</div><div className="otxt"><div className="olbl">{o.l}</div></div><div className="ochk"/>
                </div>
              ))}
            </div>
            <div className="bnav">
              <button className="btn bp" disabled={!answers.employmentLength} onClick={()=>go("applied")} style={{opacity:answers.employmentLength?1:.4}}>Continue <Arr s={18}/></button>
            </div>
          </div>
        )}

        {/* ── APPLIED ── */}
        {screen==="applied"&&(
          <div className="scr">
            <button className="bkbtn" onClick={()=>go("employment")}><ArrL/> Back</button>
            <div className="qlbl">Step 4 of 5</div>
            <h2 className="qtitle">Have you already applied?</h2>
            <p className="qsub">This helps us give you the right next steps.</p>
            <div className="opts">
              {[{v:"no",i:"❌",l:"No, I haven't applied yet"},{v:"yes_pending",i:"⏳",l:"Yes, still pending"},{v:"yes_approved",i:"✅",l:"Yes, I was approved"},{v:"yes_denied",i:"🚫",l:"Yes, I was denied"}].map(o=>(
                <div key={o.v} className={`opt${answers.applicationStatus===o.v?" sel":""}`} onClick={()=>setAnswers(a=>({...a,applicationStatus:o.v}))}>
                  <div className="oico">{o.i}</div><div className="otxt"><div className="olbl">{o.l}</div></div><div className="ochk"/>
                </div>
              ))}
            </div>
            <div className="bnav">
              <button className="btn bp" disabled={!answers.applicationStatus} onClick={()=>go("email_capture")} style={{opacity:answers.applicationStatus?1:.4}}>
                See My Results <Arr s={18}/>
              </button>
            </div>
          </div>
        )}

        {/* ── EMAIL CAPTURE (Step 5 — final step before results) ── */}
        {screen==="email_capture"&&(
          <div className="scr">
            <button className="bkbtn" onClick={()=>go("applied")}><ArrL/> Back</button>
            <div className="qlbl">Step 5 of 5 — Almost there!</div>
            <div className="ehero">
              <div className="eemoji">📬</div>
              <h2 className="etitle">Where should we send your results?</h2>
              <p className="esub">Get your personalized benefits summary and state links delivered to your inbox so you don't lose them.</p>
            </div>
            <div className="eperks">
              {[["📋","Your eligibility summary & next steps"],["🔗","Direct link to your state's application portal"],["⏰","Key filing deadlines for your state"],["📞","Your state's unemployment helpline number"]].map(([ico,txt])=>(
                <div className="eperk" key={txt}><div className="epico">{ico}</div><span>{txt}</span></div>
              ))}
            </div>
            <div className="ig">
              <label className="ilbl">Your email address</label>
              <input className="inp" type="email" placeholder="you@example.com" value={emailVal} onChange={e=>setEmailVal(e.target.value)} onKeyDown={e=>e.key==="Enter"&&emailVal.includes("@")&&handleEmailSubmit()} autoFocus/>
              <div className="ihint" style={{marginTop:8}}>
                We respect your privacy and will never sell your data.{" "}
                <button className="pvlink" onClick={()=>go("privacy")}>Read our privacy policy →</button>
              </div>
            </div>
            <div className="bnav">
              {submitting ? (
                <div className="subm"><div className="spin"/>Saving your results…</div>
              ) : (
                <>
                  <button className="btn bp" disabled={!emailVal||!emailVal.includes("@")} onClick={handleEmailSubmit} style={{opacity:emailVal&&emailVal.includes("@")?1:.4}}>
                    <Mlico/> Send My Results
                  </button>
                  <button className="skip" onClick={handleEmailSkip}>Skip — just show me my results</button>
                </>
              )}
            </div>
          </div>
        )}

        {/* ── RESULT ── */}
        {screen==="result"&&elig&&si&&(
          <div className="scr">
            <button className="bkbtn" onClick={()=>go("email_capture")}><ArrL/> Back</button>
            <div className="sectit">Your Eligibility Summary</div>
            <p className="secsub">Based on your answers for <strong>{si.name}</strong></p>
            <div className="rcrd">
              <div className="rmeter">
                <div className="rcirc" style={{background:elig.color+"22",border:`3px solid ${elig.color}`}}>
                  <div className="rpct" style={{color:elig.color}}>{elig.score}%</div>
                  <div className="rlbl2" style={{color:elig.color}}>likely</div>
                </div>
                <div>
                  <div className="rlik" style={{color:elig.color}}>{elig.likelihood} Likelihood</div>
                  <div className="rlsub">of qualifying for benefits</div>
                </div>
              </div>
              <div className="rmsg">{elig.message}</div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:20}}>
              <div className="ic" style={{margin:0}}><div className="ict">Max Weekly</div><div className="icv">${si.weeklyMax.toLocaleString()}</div><div className="ics">per week</div></div>
              <div className="ic" style={{margin:0}}><div className="ict">Up to</div><div className="icv">{si.avgWeeks} wks</div><div className="ics">of benefits</div></div>
            </div>
            {answers.applicationStatus==="yes_denied"&&(
              <div className="dbox"><div className="dboxt">⚠️ You were denied — you can appeal!</div><div className="dboxb">You have <strong>{si.appealDays} days</strong> from your denial date to file an appeal. We can generate a formal appeal letter right now.</div></div>
            )}
            <div style={{marginBottom:24}}>
              <div className="sectit" style={{fontSize:18}}>Your Next Steps</div>
              <div className="steps" style={{marginTop:14}}>
                {(answers.applicationStatus==="no"?[
                  ["Apply online now",`Visit ${si.name}'s official portal — takes about 20 minutes.`],
                  ["Have your info ready","Employer name & address, employment dates, separation reason."],
                  ["Certify weekly","Certify your job search each week to keep receiving benefits."],
                ]:answers.applicationStatus==="yes_denied"?[
                  ["Generate your appeal letter","Use our tool below to create a professional appeal letter in minutes."],
                  ["File before the deadline",`You have ${si.appealDays} days from denial to appeal. Don't wait.`],
                  ["Consider legal help","If you believe you were wrongly denied, an employment lawyer can help."],
                ]:[
                  ["Check your claim status","Log in to your state portal to see updates or information requests."],
                  ["Certify weekly","Keep certifying each week to continue receiving benefits."],
                  ["Report any income","Report any part-time wages when you certify."],
                ]).map(([t,d],i)=>(
                  <div className="step" key={i}><div className="snum">{i+1}</div><div className="sbdy"><div className="stit">{t}</div><div className="sdsc">{d}</div></div></div>
                ))}
              </div>
            </div>
            <a className="plink" href={si.portal} target="_blank" rel="noopener noreferrer">
              <div className="plink-l"><div className="plico"><GlobeIco/></div><div><div style={{fontWeight:600,fontSize:14}}>Apply on {si.name}'s official site</div><div style={{fontSize:12,color:"var(--text3)"}}>Official government portal</div></div></div>
              <Ext/>
            </a>
            <div className="bnav">
              {answers.applicationStatus==="yes_denied"&&<button className="btn bamb" onClick={()=>go("appeal_intro")}>✉️ Generate Appeal Letter</button>}
              <button className="btn bs" onClick={()=>go("forms")}>📄 View Required Documents</button>
              {(answers.endReason==="fired"||answers.endReason==="quit_good_cause")&&<button className="btn bog" onClick={()=>go("lawyer")}>⚖️ Talk to a Lawyer</button>}
            </div>
          </div>
        )}

        {/* ── FORMS ── */}
        {screen==="forms"&&si&&(
          <div className="scr">
            <button className="bkbtn" onClick={()=>go("result")}><ArrL/> Back</button>
            <div className="sectit">Documents & Forms</div>
            <p className="secsub">What you'll need to apply in <strong>{si.name}</strong></p>
            <div className="fbanner"><Shld/><p className="fbtxt">All forms and applications are free through official government portals.</p></div>
            <div style={{marginBottom:24}}>
              <div style={{fontWeight:600,fontSize:15,marginBottom:12}}>Required Documents</div>
              {[["🪪","Photo ID or Social Security Card","Government-issued ID or your SSN card"],["💼","Employment information","Employer name, address, phone; your job title"],["📅","Work history","Start and end dates for jobs in the past 18 months"],["💵","Earnings information","Your wages and hours for the last 12–18 months"],["📝","Separation information","Reason for separation; any documents from your employer"],["🏦","Bank account details","Routing and account number for direct deposit"]].map(([ico,t,d])=>(
                <div key={t} style={{display:"flex",gap:12,padding:"12px 0",borderBottom:"1px solid var(--border)"}}>
                  <div style={{fontSize:20}}>{ico}</div><div><div style={{fontWeight:500,fontSize:14}}>{t}</div><div style={{fontSize:13,color:"var(--text2)"}}>{d}</div></div>
                </div>
              ))}
            </div>
            <div style={{marginBottom:24}}>
              <div style={{fontWeight:600,fontSize:15,marginBottom:12}}>How to Apply</div>
              <div className="steps">
                {[["Online (fastest)",`Visit ${si.portal} — most claims are processed faster online.`],["By phone",`Call ${si.phone}. Have your documents ready.`],["In person","Find your local workforce center at your state's labor department website."]].map(([t,d],i)=>(
                  <div className="step" key={i}><div className="snum">{i+1}</div><div className="sbdy"><div className="stit">{t}</div><div className="sdsc">{d}</div></div></div>
                ))}
              </div>
            </div>
            <div className="ic amb"><div className="ict">Important Deadlines</div><div className="icv">Apply as soon as possible</div><div className="ics">Most states don't backpay before your application date. Apply within 1–2 weeks of losing your job.</div></div>
            <div className="bnav">
              <a href={si.portal} target="_blank" rel="noopener noreferrer" className="btn bp">Apply Now on {si.name} Portal <Ext/></a>
            </div>
          </div>
        )}

        {/* ── APPEAL INTRO ── */}
        {screen==="appeal_intro"&&(
          <div className="scr">
            <button className="bkbtn" onClick={()=>go(answers.state?"result":"home")}><ArrL/> Back</button>
            <div className="sectit">Generate Your Appeal Letter</div>
            <p className="secsub">We'll create a professional, formatted appeal letter tailored to your situation.</p>
            <div className="hnote"><strong>Your benefits can be appealed.</strong> Even if your claim was denied, many denials are overturned with a clear written appeal.</div>
            <div style={{marginBottom:20}}>
              <div style={{fontWeight:600,fontSize:15,marginBottom:12}}>What we'll create</div>
              {["A formal letter addressed to your state's appeals office","A clear statement of why you should qualify","Professional legal tone with proper formatting","Reference to your state's unemployment law standards"].map(item=>(
                <div key={item} style={{display:"flex",gap:10,padding:"8px 0",borderBottom:"1px solid var(--border)"}}>
                  <div style={{color:"var(--green)"}}><Chk/></div><div style={{fontSize:14,color:"var(--text2)"}}>{item}</div>
                </div>
              ))}
            </div>
            {!answers.state&&(
              <div className="ig">
                <label className="ilbl">Your state *</label>
                <div className="swrap">
                  <select value={answers.state||""} onChange={e=>setAnswers(a=>({...a,state:e.target.value}))}>
                    <option value="">Select state…</option>
                    {STATES.map(s=><option key={s.code} value={s.code}>{s.name}</option>)}
                  </select>
                  <div className="sarr"><CvDown/></div>
                </div>
              </div>
            )}
            <div className="bnav">
              <button className="btn bp" disabled={!answers.state} onClick={()=>go("appeal_form")} style={{opacity:answers.state?1:.4}}>Start Building My Letter <Arr s={18}/></button>
            </div>
          </div>
        )}

        {/* ── APPEAL FORM ── */}
        {screen==="appeal_form"&&(
          <div className="scr">
            <button className="bkbtn" onClick={()=>go("appeal_intro")}><ArrL/> Back</button>
            <div className="sectit">Your Information</div>
            <p className="secsub">Fill in what you know — only your name is required.</p>
            {[["firstName","First Name *","text","Your first name"],["lastName","Last Name *","text","Your last name"],["claimId","Claim / Reference Number","text","From your denial letter"],["ssn4","Last 4 of SSN","text","e.g. 1234"]].map(([k,l,t,p])=>(
              <div className="ig" key={k}><label className="ilbl">{l}</label><input className="inp" type={t} placeholder={p} maxLength={k==="ssn4"?4:undefined} value={aData[k]||""} onChange={e=>setAData(a=>({...a,[k]:e.target.value}))}/></div>
            ))}
            {[["denialDate","Date of Denial Notice"],["startDate","Employment Start Date"],["endDate","Employment End Date"]].map(([k,l])=>(
              <div className="ig" key={k}><label className="ilbl">{l}</label><input className="inp" type="date" value={aData[k]||""} onChange={e=>setAData(a=>({...a,[k]:e.target.value}))}/></div>
            ))}
            <div className="ig">
              <label className="ilbl">Were you laid off or fired?</label>
              <div className="chips">
                {[["yes","Laid off / Downsized"],["no","Fired / Terminated"]].map(([v,l])=>(
                  <div key={v} className={`chip${aData.wasLayoff===v?" on":""}`} onClick={()=>setAData(a=>({...a,wasLayoff:v}))}>{l}</div>
                ))}
              </div>
            </div>
            <div className="ig"><label className="ilbl">Reason given by employer (if any)</label><input className="inp" placeholder="e.g. performance, policy violation, budget cuts…" value={aData.termReason||""} onChange={e=>setAData(a=>({...a,termReason:e.target.value}))}/></div>
            <div className="ig"><label className="ilbl">Your explanation of what happened</label><textarea className="inp ta" placeholder="In your own words, explain the situation…" value={aData.userExplanation||""} onChange={e=>setAData(a=>({...a,userExplanation:e.target.value}))}/></div>
            <div className="bnav">
              <button className="btn bp" disabled={!aData.firstName||!aData.lastName} onClick={handleGenerateLetter} style={{opacity:aData.firstName&&aData.lastName?1:.4}}>Generate My Letter <Arr s={18}/></button>
            </div>
          </div>
        )}

        {/* ── APPEAL LETTER ── */}
        {screen==="appeal_letter"&&(
          <div className="scr">
            <button className="bkbtn" onClick={()=>go("appeal_form")}><ArrL/> Edit</button>
            <div className="sectit">Your Appeal Letter</div>
            <p className="secsub" style={{marginBottom:12}}>Review, then copy, print, or email this letter.</p>
            {si&&(
              <div className="dbox" style={{marginBottom:16}}>
                <div className="dboxt">⏰ File by your deadline</div>
                <div className="dboxb">{si.name} allows <strong>{si.appealDays} days</strong> from your denial to appeal.<br/><br/><strong>Submit to:</strong> <a href={si.portal} target="_blank" rel="noopener noreferrer" style={{color:"var(--amber)"}}>{si.portal}</a> or call {si.phone}</div>
              </div>
            )}
            <div className="ltrbox">{letter}</div>
            {cpyOk&&<div className="cpyok">✓ Copied to clipboard!</div>}
            <div className="ltract">
              <button className="btn bs bsm" onClick={handleCopy}><Cpy/> Copy Letter</button>
              <button className="btn bs bsm" onClick={handlePrint}><Prt/> Print / PDF</button>
            </div>
            <div className="hnote"><strong>Tips:</strong> Include supporting documents (pay stubs, emails, termination notice). Keep a copy for your records. Call your state office to confirm receipt.</div>
            <div className="bnav"><button className="btn bog" onClick={()=>go("lawyer")}>⚖️ Also speak with a lawyer</button></div>
          </div>
        )}

        {/* ── LAWYER ── */}
        {screen==="lawyer"&&(
          <div className="scr">
            <button className="bkbtn" onClick={()=>go(answers.state?"result":"home")}><ArrL/> Back</button>
            <div className="lhero"><div className="lhtit">You may have legal protections.</div><div className="lhsub">Employment law protects workers in many situations. A free consultation can help you understand your options.</div></div>
            <div style={{fontWeight:600,fontSize:15,marginBottom:12}}>You may have a case if you were…</div>
            <div className="rlist">
              {[["🚫","Wrongfully terminated","Fired for illegal reasons: discrimination, retaliation, or whistleblowing"],["👷","Misclassified as a contractor","Denied benefits because your employer called you independent contractor"],["😤","Retaliated against","Fired after reporting harassment, safety issues, or illegal activity"],["⚖️","Denied benefits unfairly","Denied unemployment despite qualifying under your state's law"],["📢","Discriminated against","Treated differently due to race, gender, age, disability, or religion"]].map(([ico,t,d])=>(
                <div className="ritem" key={t}><div className="rico">{ico}</div><div className="rtxt"><strong>{t}</strong>{d}</div></div>
              ))}
            </div>
            {!lSent?(
              <>
                <div style={{fontWeight:600,fontSize:15,marginBottom:14}}>Request a Free Consultation</div>
                <div className="hnote"><strong>No fees unless you win.</strong> Most employment lawyers work on contingency — you pay nothing unless they recover money for you.</div>
                {[["name","Your Name *","text","Full name"],["phone","Phone Number","tel","Best number to reach you"],["email","Email Address","email","Your email"]].map(([k,l,t,p])=>(
                  <div className="ig" key={k}><label className="ilbl">{l}</label><input className="inp" type={t} placeholder={p} value={lForm[k]} onChange={e=>setLForm(f=>({...f,[k]:e.target.value}))}/></div>
                ))}
                <div className="ig"><label className="ilbl">Briefly describe your situation</label><textarea className="inp ta" placeholder="What happened? When were you terminated? Any details…" value={lForm.situation} onChange={e=>setLForm(f=>({...f,situation:e.target.value}))}/></div>
                <div className="bnav">
                  <button className="btn bblu" disabled={!lForm.name} style={{opacity:lForm.name?1:.4}} onClick={handleLawyerSubmit}>Request Free Consultation <Arr s={18}/></button>
                </div>
              </>
            ):(
              <div style={{textAlign:"center",padding:"24px 0"}}>
                <div style={{fontSize:48,marginBottom:12}}>✅</div>
                <div className="sectit">Request Submitted</div>
                <p style={{color:"var(--text2)",fontSize:14,lineHeight:1.6,marginBottom:24}}>An employment attorney will reach out within 1–2 business days. Most consultations are completely free.</p>
                <div className="hnote">While you wait, keep records of everything: emails, texts, performance reviews, and notes on conversations with your employer.</div>
                <button className="btn bog" onClick={()=>go("home")}>Back to Home</button>
              </div>
            )}
          </div>
        )}

        {/* ── PRIVACY POLICY ── */}
        {screen==="privacy"&&(
          <div className="scr">
            <button className="bkbtn" onClick={()=>go(prevScreen||"home")}><ArrL/> Back</button>
            <div className="sectit">Privacy Policy</div>
            <p className="peff">Effective: {new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}</p>

            <div className="psec">
              <h3>Who we are</h3>
              <p>BenefitsPath is a free service that helps people navigate unemployment benefits in the United States. We are not a government agency, law firm, or insurance provider.</p>
            </div>
            <div className="psec">
              <h3>What information we collect</h3>
              <p>We collect only what you voluntarily provide while using our tool:</p>
              <ul>
                <li>Email address (if you choose to share it)</li>
                <li>State of employment and employment tenure</li>
                <li>How your employment ended</li>
                <li>Unemployment application and denial status</li>
                <li>Information you enter in the appeal letter generator</li>
                <li>Information you provide when requesting a lawyer consultation</li>
              </ul>
            </div>
            <div className="psec">
              <h3>How we use your information</h3>
              <p>We use your information to:</p>
              <ul>
                <li>Deliver personalized eligibility guidance and next steps</li>
                <li>Send your results and state-specific resources to your email (if provided)</li>
                <li>Route lawyer consultation requests to appropriate contacts</li>
                <li>Improve our service through internal analytics — for example, understanding which states need the most support, or which steps cause confusion</li>
                <li>Review submissions internally to monitor service quality and accuracy</li>
              </ul>
            </div>
            <div className="psec">
              <h3>What we do not do</h3>
              <ul>
                <li>We do not sell your personal information to third parties</li>
                <li>We do not share your data with advertisers</li>
                <li>We do not use your information for targeted advertising</li>
                <li>We do not store your SSN digits beyond your session</li>
              </ul>
            </div>
            <div className="psec">
              <h3>Data storage and security</h3>
              <p>Responses may be stored in a secure internal database accessible only to the BenefitsPath team. This data is used solely for service improvement and quality review. We apply industry-standard security practices to protect your information.</p>
            </div>
            <div className="psec">
              <h3>Email communications</h3>
              <p>If you provide your email address, we may send you your benefits summary and relevant state resources. You can unsubscribe at any time by replying "unsubscribe" to any email or contacting us directly.</p>
            </div>
            <div className="psec">
              <h3>Third-party links</h3>
              <p>This service links to official government unemployment portals. We are not responsible for the privacy practices of those external sites.</p>
            </div>
            <div className="psec">
              <h3>Your rights</h3>
              <p>You may request deletion of your data at any time by contacting us at <strong>privacy@benefitspath.com</strong>. We will honor deletion requests within 30 days.</p>
            </div>
            <div className="psec">
              <h3>Changes to this policy</h3>
              <p>We may update this policy periodically. Continued use of the service after changes constitutes acceptance of the updated policy.</p>
            </div>
            <div className="psec">
              <h3>Contact</h3>
              <p>Questions? Email <strong>privacy@benefitspath.com</strong></p>
            </div>
            <div className="bnav">
              <button className="btn bs" onClick={()=>go(prevScreen||"home")}>← Return to {prevScreen==="email_capture"?"Sign Up":"Home"}</button>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
