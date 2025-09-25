
// -- START FULL UI COMPONENT --
import React, { useMemo, useState } from "react";

const AdBox = () => (
  <div className="w-full h-20 rounded-xl border border-dashed border-slate-300 flex items-center justify-center text-xs text-slate-500">AdSense slot</div>
);

const Section = ({ title, subtitle, children }: any) => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 space-y-3">
    <div>
      <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
      {subtitle && <p className="text-slate-500 text-sm mt-1">{subtitle}</p>}
    </div>
    {children}
  </div>
);

const Watermark = () => (
  <div className="absolute inset-0 -rotate-12 flex items-center justify-center select-none pointer-events-none">
    <div className="text-5xl font-extrabold tracking-widest text-slate-400/15">SAMPLE • PREVIEW</div>
  </div>
);

export default function PreviewApp() {
  const tabs = useMemo(
    () => [
      { id: "builder", label: "CV Builder" },
      { id: "preview", label: "Template/Preview" },
      { id: "cover", label: "Cover Letter" },
      { id: "interview", label: "Interview Coach" },
      { id: "qa", label: "Interview Q&A" },
      { id: "jobs", label: "Jobs Board" },
      { id: "post", label: "Post a Job" },
      { id: "myposts", label: "My Job Posts" },
      { id: "videos", label: "Videos" },
      { id: "myvideos", label: "My Videos" },
      { id: "tools", label: "File Tools" },
      { id: "wallet", label: "Referrals/Wallet" },
      { id: "pricing", label: "Pricing" },
    ],
    []
  );

  const [tab, setTab] = useState("cover");
  const [plan, setPlan] = useState<"free" | "premium">("free");
  const [tokens, setTokens] = useState(2);
  const [canDownload, setCanDownload] = useState(false);
  const [wallet, setWallet] = useState(40);

  const [fullName, setFullName] = useState("Your Name");
  const [headline, setHeadline] = useState("Mechanical Engineering Graduate");
  const [summary, setSummary] = useState("Mechanical Engineering graduate with hands-on lab maintenance and tutoring experience. Skilled in preventative maintenance, SolidWorks, and data analysis.");
  const [bullets, setBullets] = useState("• Reduced downtime by 22% via preventative schedules\n• Trained 20+ students on safe milling/lathe operation");
  const [skills, setSkills] = useState("Preventative maintenance, SolidWorks, Root cause analysis, Excel");
  const [template, setTemplate] = useState("ATS Classic");
  const [accent, setAccent] = useState("sky");
  const [font, setFont] = useState("Inter");

  const [jd, setJd] = useState("We seek a maintenance technician skilled in preventative maintenance, root cause analysis and safety.");
  const [coverDraft, setCoverDraft] = useState("");
  const [coverBusy, setCoverBusy] = useState(false);
  const [refineInstructions, setRefineInstructions] = useState("");
  const [refineBusy, setRefineBusy] = useState(false);

  const [question, setQuestion] = useState("Tell me about yourself");
  const [role, setRole] = useState("Mechanical Technician");
  const [interviewOut, setInterviewOut] = useState("");
  const [intBusy, setIntBusy] = useState(false);

  type QA = { id: number; position: string; q: string; a: string; tips?: string; votes: number; created: string };
  const [qa, setQa] = useState<QA[]>([
    { id: 1, position: "Mechanical Technician", q: "Tell me about yourself", a: "Present-Past-Future; add one quantified win (e.g., 22% downtime cut).", tips: "60-90 sec.", votes: 12, created: "2025-09-01" },
  ]);
  const [qaSearch, setQaSearch] = useState("");
  const [qaForm, setQaForm] = useState({ position: "", q: "", a: "", tips: "" });

  const [jobs, setJobs] = useState([
    { id: 1, title: "Mechanical Intern", company: "ArcelorMittal", location: "Vanderbijlpark", type: "Internship", link: "https://www.linkedin.com/", desc: "Assist with preventative maintenance and data logging." },
  ]);
  const [jobForm, setJobForm] = useState({ title: "", company: "", location: "", type: "Full-time", link: "", desc: "" });

  type Vid = { id: number; title: string; type: "YouTube" | "Upload"; url?: string; views: number; claimed: number; desc?: string; owner?: boolean };
  const [videos, setVideos] = useState<Vid[]>([
    { id: 101, title: "How to answer: Tell me about yourself", type: "YouTube", url: "https://youtu.be/demo", views: 6500, claimed: 0, desc: "Structure + sample answers.", owner: true },
  ]);
  const [videoForm, setVideoForm] = useState({ title: "", url: "", desc: "" });

  const [fileInfo, setFileInfo] = useState<{ name?: string; type?: string; size?: number }>({});
  const [targetSize, setTargetSize] = useState(1);
  const [convertFrom, setConvertFrom] = useState("pdf");
  const [convertTo, setConvertTo] = useState("docx");

  function useToken(run: () => void) {
    if (plan === "premium") { run(); return; }
    if (tokens <= 0) { alert("You have used your 2 free tokens for this month."); setTab("pricing"); return; }
    setTokens(tokens - 1); run();
  }
  function simulateImportOldCV() {
    setFullName("Sipho N. Dlamini");
    setHeadline("Maintenance Technician Intern");
    setSummary("Hands-on tech with PM, RCA, and safety training. Improved lab uptime by 22%.");
    setBullets("• Implemented weekly PM that cut repeat faults by 15%\n• Logged work orders; followed up to prevent recurrences\n• Coached 20+ peers on safe machining procedures");
    setSkills("Preventative maintenance, RCA, Milling/Lathe, Work permits, Excel");
    alert("Old CV imported and mapped (demo).");
  }
  function simulateCover() {
    useToken(() => {
      setCoverBusy(true);
      setTimeout(() => {
        setCoverBusy(false);
        setCoverDraft(`Dear Hiring Manager,\n\nI am excited to apply for the ${role}. I introduced preventative checks that reduced downtime by 22% and coached 20+ students on safe machining. I document clearly, follow safety permits, and use root-cause analysis to stop repeat faults.\n\nKind regards,\n${fullName}`);
      }, 600);
    });
  }
  function simulateOCRFromImage() {
    useToken(() => {
      setCoverBusy(true);
      setTimeout(() => {
        setCoverBusy(false);
        setJd("Screenshot parsed: Company seeks preventative maintenance + safety + RCA (CMMS is a plus).");
        alert("Job image parsed (demo).");
      }, 600);
    });
  }
  function simulateRefine() {
    useToken(() => {
      if (!coverDraft) { alert("Create a draft first"); return; }
      setRefineBusy(true);
      setTimeout(() => {
        setRefineBusy(false);
        const note = refineInstructions ? `\n\n[Edited based on: ${refineInstructions}]` : "\n\n[Edited: tightened language and added specifics]";
        setCoverDraft((d) => d + note);
      }, 600);
    });
  }
  function simulateInterview() {
    useToken(() => {
      setIntBusy(true);
      setTimeout(() => {
        setIntBusy(false);
        setInterviewOut(`Strategy: Present -> Past -> Future with one quantified win.\n\nAnswer: I am a ${role} with practical problem-solving. I added a PM checklist that reduced breakdowns by 22% and trained 20+ students on safe milling/lathe. I log work, follow up, and coordinate with production so fixes stick.`);
      }, 600);
    });
  }
  function tryDownload(kind: "pdf" | "docx") {
    if (!canDownload) { alert("Downloads are locked. Upgrade to Premium (R60/month)."); setTab("pricing"); return; }
    alert(`Downloading ${kind.toUpperCase()}... (demo)`);
  }
  function submitJob(e: React.FormEvent) {
    e.preventDefault();
    const { title, company, location, type, link, desc } = jobForm as any;
    if (!title || !company || !link) { alert("Title, Company and Apply link are required."); return; }
    try { new URL(link); } catch { alert("Use a valid https:// link"); return; }
    setJobs([{ id: Date.now(), title, company, location, type, link, desc }, ...jobs]);
    alert("Job posted! Live on Jobs Board.");
    setTab("jobs");
    setJobForm({ title: "", company: "", location: "", type: "Full-time", link: "", desc: "" });
  }
  function addQA(e: React.FormEvent) {
    e.preventDefault();
    const { position, q, a, tips } = qaForm as any;
    if (!position || !q || !a) { alert("Position, Question, Answer required"); return; }
    const item: QA = { id: Date.now(), position: position.trim(), q: q.trim(), a: a.trim(), tips: tips?.trim() || "", votes: 0, created: new Date().toISOString().slice(0, 10) };
    setQa([item, ...qa]); setQaForm({ position: "", q: "", a: "", tips: "" }); alert("Submitted to Q&A board.");
  }
  function voteQA(id: number, delta: number) { setQa((prev) => prev.map((x) => (x.id === id ? { ...x, votes: Math.max(0, x.votes + delta) } : x))); }
  function addVideo(e: React.FormEvent) {
    e.preventDefault();
    if (!videoForm.title) { alert("Title required"); return; }
    let type: "YouTube" | "Upload" = "Upload";
    if (videoForm.url) { try { const u = new URL(videoForm.url); if (u.hostname.includes("youtu")) type = "YouTube"; } catch { alert("Enter valid URL or leave blank"); return; } }
    setVideos([{ id: Date.now(), title: videoForm.title, type, url: videoForm.url || undefined, views: 0, claimed: 0, desc: videoForm.desc, owner: true }, ...videos]);
    setVideoForm({ title: "", url: "", desc: "" }); alert("Video added!");
  }
  function simulateViews(id: number, add: number) { setVideos((prev) => prev.map((v) => (v.id === id ? { ...v, views: v.views + add } : v))); }
  function claimEarnings(id: number) {
    setVideos((prev) => prev.map((v) => {
      if (v.id !== id) return v;
      const earned = Math.floor(v.views / 10000) * 10;
      const claim = earned - v.claimed;
      if (claim <= 0) { alert("Nothing to claim yet"); return v; }
      alert(`Claimed R${claim}`); return { ...v, claimed: v.claimed + claim };
    }));
  }
  function deleteVideo(id: number) { setVideos((prev) => prev.filter((v) => v.id !== id)); alert("Video deleted"); }
  function withdraw() { const min = 200; alert(`Withdrawal requested: R${min} (demo)`); }
  function simulateCompress() { alert("Compressed (demo)"); }
  function simulateConvert() { alert("Converted (demo)"); }

  return (
    <div className="min-h-screen bg-slate-50 pb-16 md:pb-0">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-sky-600" />
            <span className="font-semibold">HireReady.ai</span>
            <span className="ml-2 text-xs text-slate-500 hidden sm:inline">Plan: {plan.toUpperCase()} • Tokens: {plan === "premium" ? "∞" : tokens}</span>
          </div>
          <nav className="hidden md:flex items-center gap-4 text-sm">
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)} className={`hover:text-sky-700 ${tab === t.id ? "text-sky-700 font-semibold" : "text-slate-600"}`}>{t.label}</button>
            ))}
          </nav>
        </div>
        <div className="md:hidden border-t border-slate-200 overflow-x-auto">
          <div className="flex gap-2 px-4 py-2 w-max">
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)} className={`px-3 py-1 rounded-lg border text-xs whitespace-nowrap ${tab === t.id ? "border-sky-600 text-sky-700" : "border-slate-200 text-slate-600"}`}>{t.label}</button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Builder */}
          {tab === "builder" && (
            <Section title="CV Builder" subtitle="Type details, or import an old CV and let the assistant map it into your new template.">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="block text-sm">Full name</label>
                  <input className="w-full rounded-lg border px-3 py-2" defaultValue="Your Name" onChange={(e)=>{}} />
                  <label className="block text-sm">Headline</label>
                  <input className="w-full rounded-lg border px-3 py-2" defaultValue="Mechanical Engineering Graduate" onChange={(e)=>{}} />
                  <label className="block text-sm">Summary</label>
                  <textarea className="w-full rounded-lg border px-3 py-2" rows={4} defaultValue="Mechanical Engineering graduate with hands-on lab maintenance and tutoring experience." />
                  <div className="flex gap-2">
                    <button onClick={()=>alert("Polished (demo)")} className="px-3 py-2 rounded-lg bg-slate-900 text-white text-sm">Polish text</button>
                    <button onClick={()=>alert("Imported old CV (demo)")} className="px-3 py-2 rounded-lg border text-sm">Import old CV (demo)</button>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="block text-sm">Experience bullets</label>
                  <textarea className="w-full rounded-lg border px-3 py-2" rows={8} defaultValue={"• Reduced downtime by 22% via preventative schedules\n• Trained peers on safe milling"} />
                  <label className="block text-sm">Skills (comma-separated)</label>
                  <input className="w-full rounded-lg border px-3 py-2" defaultValue="Preventative maintenance, SolidWorks, RCA, Excel" />
                </div>
              </div>
              <div className="mt-4"><AdBox /></div>
            </Section>
          )}

          {/* Preview */}
          {tab === "preview" && (
            <Section title="Template & Preview" subtitle="Choose template, color and font. Preview is watermarked; downloads unlock after upgrade.">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-3">
                  <label className="block text-sm">Template</label>
                  <select className="w-full rounded-lg border px-3 py-2">
                    <option>ATS Classic</option>
                    <option>Modern Two-Column</option>
                    <option>Classic Reverse</option>
                  </select>
                  <label className="block text-sm">Accent color</label>
                  <div className="grid grid-cols-6 gap-2">
                    {["sky","teal","rose","violet","slate","emerald"].map((c) => (
                      <button key={c} className="h-8 rounded-lg border" title={c}></button>
                    ))}
                  </div>
                  <label className="block text-sm mt-2">Font</label>
                  <select className="w-full rounded-lg border px-3 py-2">
                    <option>Inter</option>
                    <option>Arial</option>
                    <option>Calibri</option>
                  </select>
                  <AdBox />
                </div>
                <div className="md:col-span-2">
                  <div className="relative bg-white border border-slate-200 rounded-xl overflow-hidden">
                    <div className="p-6 grid gap-4 text-slate-800">
                      <div>
                        <h1 className="text-2xl font-bold">Your Name</h1>
                        <p className="text-sm text-slate-500">Johannesburg • email@example.com • 012 345 6789 • LinkedIn</p>
                        <p className="text-sm text-slate-600 mt-1">Mechanical Engineering Graduate</p>
                      </div>
                      <div>
                        <h2 className="font-semibold">Professional Summary</h2>
                        <p className="text-sm">ATS-friendly, clean layout. (Watermarked)</p>
                      </div>
                      <div>
                        <h2 className="font-semibold">Experience</h2>
                        <pre className="text-sm whitespace-pre-wrap">• Reduced downtime by 22% via preventative schedules</pre>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <button onClick={()=>alert("Downloads locked (demo)")} className="px-3 py-2 rounded-lg bg-slate-900 text-white text-sm">Download PDF</button>
                    <button onClick={()=>alert("Downloads locked (demo)")} className="px-3 py-2 rounded-lg border text-sm">Download Word</button>
                    <span className="text-xs text-slate-500">Locked — upgrade to download</span>
                  </div>
                </div>
              </div>
            </Section>
          )}

          {/* Cover Letter */}
          {tab === "cover" && (
            <Section title="Cover Letter" subtitle="Paste the JD, generate a tailored letter, then refine with extra instructions.">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="block text-sm">Job description</label>
                  <textarea className="w-full rounded-lg border px-3 py-2" rows={8} defaultValue="We seek a maintenance technician skilled in PM, RCA and safety." />
                  <div className="flex flex-wrap gap-2 text-sm">
                    <button onClick={()=>alert("Created letter (demo)")} className="px-3 py-2 rounded-lg bg-slate-900 text-white">Create letter (2 left)</button>
                    <button className="px-3 py-2 rounded-lg border">Shorten</button>
                    <button className="px-3 py-2 rounded-lg border">More formal</button>
                    <button className="px-3 py-2 rounded-lg border">Upload job image ➜ extract (demo)</button>
                  </div>
                  <div className="text-xs text-slate-600 mt-2">Quick add:</div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <button className="px-2 py-1 rounded-full border">Add skills</button>
                    <button className="px-2 py-1 rounded-full border">Add achievement</button>
                    <button className="px-2 py-1 rounded-full border">Mention location</button>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="block text-sm">Draft</label>
                  <textarea className="w-full rounded-lg border px-3 py-2" rows={10} defaultValue="Dear Hiring Manager,... (demo draft)" />
                  <div className="space-y-2">
                    <label className="block text-sm">Tell the assistant what to add or edit</label>
                    <textarea className="w-full rounded-lg border px-3 py-2" rows={4} placeholder="e.g., Add CMMS; mention I'm close to Vanderbijlpark; keep it 180 words; friendlier tone" />
                    <div className="flex flex-wrap gap-2 text-sm">
                      <button className="px-3 py-2 rounded-lg bg-slate-900 text-white">Refine letter (2 left)</button>
                      <button className="px-3 py-2 rounded-lg border">Clear instructions</button>
                    </div>
                    <div className="text-xs text-slate-500">We keep it private to your brand only.</div>
                  </div>
                </div>
              </div>
            </Section>
          )}

          {/* Interview Coach */}
          {tab === "interview" && (
            <Section title="Interview Coach" subtitle="Practice answers privately or post to community Q&A.">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="block text-sm">Question</label>
                  <input className="w-full rounded-lg border px-3 py-2" defaultValue="Tell me about yourself" />
                  <label className="block text-sm">Role / Field</label>
                  <input className="w-full rounded-lg border px-3 py-2" defaultValue="Mechanical Technician" />
                  <div className="flex gap-2 text-sm">
                    <button className="px-3 py-2 rounded-lg bg-slate-900 text-white">Get a model answer (2 left)</button>
                    <button className="px-3 py-2 rounded-lg border">Shorter</button>
                    <button className="px-3 py-2 rounded-lg border">More confident</button>
                    <button className="px-3 py-2 rounded-lg border">Post to Q&A ➜</button>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="block text sm">Strategy & Answer</label>
                  <textarea className="w-full rounded-lg border px-3 py-2" rows={14} placeholder="Strategy + sample answer + talking points." defaultValue="Strategy: Present-Past-Future with a quantified win (22% downtime cut)..." />
                </div>
              </div>
            </Section>
          )}

          {/* Q&A */}
          {tab === "qa" && (
            <Section title="Interview Q&A (Community)" subtitle="Search by position and share what you faced.">
              <div className="space-y-4">
                <div className="flex gap-2 items-center">
                  <input className="w-full rounded-lg border px-3 py-2" placeholder="Search position" />
                  <button className="px-3 py-2 rounded-lg border">Search</button>
                </div>
                <form className="grid md:grid-cols-2 gap-4 p-4 border rounded-xl bg-slate-50">
                  <div className="space-y-3">
                    <label className="block text-sm">Position</label>
                    <input className="w-full rounded-lg border px-3 py-2" />
                    <label className="block text-sm">Question</label>
                    <input className="w-full rounded-lg border px-3 py-2" />
                  </div>
                  <div className="space-y-3">
                    <label className="block text-sm">Your answer</label>
                    <textarea className="w-full rounded-lg border px-3 py-2" rows={6} />
                    <label className="block text-sm">Tips (optional)</label>
                    <input className="w-full rounded-lg border px-3 py-2" />
                  </div>
                  <div className="md:col-span-2 flex gap-2">
                    <button type="submit" className="px-4 py-2 rounded-xl bg-slate-900 text-white text-sm">Submit Q&A</button>
                    <button type="button" className="px-4 py-2 rounded-xl border text-sm">Clear</button>
                  </div>
                </form>
              </div>
            </Section>
          )}

          {/* Jobs */}
          {tab === "jobs" && (
            <Section title="Jobs Board" subtitle="Apply opens the employer's link in a new tab.">
              <div className="grid md:grid-cols-3 gap-4">
                {[1,2,3].map((i) => (
                  <div key={i} className="bg-white border rounded-xl p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-semibold">Mechanical Intern</div>
                        <div className="text-xs text-slate-500">ArcelorMittal • Vanderbijlpark</div>
                      </div>
                      <span className="px-2 py-1 text-xs rounded-full bg-slate-100 border">Internship</span>
                    </div>
                    <p className="text-sm text-slate-600">Assist with preventative maintenance and data logging.</p>
                    <div className="flex gap-2">
                      <a href="#" className="px-3 py-1.5 rounded-lg border text-sm">Apply (external)</a>
                      <button className="px-3 py-1.5 rounded-lg border text-sm">Save</button>
                    </div>
                    <p className="text-[11px] text-slate-500">We do not collect applications. Apply on the employer site.</p>
                  </div>
                ))}
              </div>
              <div className="mt-4"><AdBox /></div>
            </Section>
          )}

          {/* Post */}
          {tab === "post" && (
            <Section title="Post a Job" subtitle="Paste details and an official Apply link. Anyone can post.">
              <form className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="block text-sm">Job title</label>
                  <input className="w-full rounded-lg border px-3 py-2" />
                  <label className="block text-sm">Company</label>
                  <input className="w-full rounded-lg border px-3 py-2" />
                  <label className="block text-sm">Location</label>
                  <input className="w-full rounded-lg border px-3 py-2" />
                  <label className="block text sm">Type</label>
                  <select className="w-full rounded-lg border px-3 py-2">
                    <option>Full-time</option><option>Contract</option><option>Internship</option><option>Part-time</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="block text-sm">Apply link (official URL)</label>
                  <input className="w-full rounded-lg border px-3 py-2" placeholder="https://company.jobs/apply/123" />
                  <label className="block text-sm">Description</label>
                  <textarea className="w-full rounded-lg border px-3 py-2" rows={8} />
                  <div className="flex gap-2">
                    <button type="submit" className="px-4 py-2 rounded-xl bg-slate-900 text-white text-sm">Submit job</button>
                    <button type="button" className="px-4 py-2 rounded-xl border text-sm">Preview</button>
                  </div>
                </div>
              </form>
            </Section>
          )}

          {/* My Posts */}
          {tab === "myposts" && (
            <Section title="My Job Posts" subtitle="Manage your listings and see status.">
              <div className="overflow-hidden rounded-xl border">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr><th className="text-left p-3">Title</th><th className="text-left p-3">Company</th><th className="text-left p-3">Status</th><th className="text-left p-3">Actions</th></tr>
                  </thead>
                  <tbody>
                    <tr className="border-t"><td className="p-3">Mechanical Intern</td><td className="p-3">ArcelorMittal</td><td className="p-3">Approved</td><td className="p-3"><button className="px-3 py-1.5 rounded-lg border">Edit</button></td></tr>
                  </tbody>
                </table>
              </div>
            </Section>
          )}

          {/* Videos */}
          {tab === "videos" && (
            <Section title="Videos (Learn & Earn)" subtitle="Share interview tips or company insights. Earn R10 per 10,000 views. Ads run on all videos.">
              <form className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="block text-sm">Title</label>
                  <input className="w-full rounded-lg border px-3 py-2" placeholder="e.g., How to ace HR screening" />
                  <label className="block text-sm">YouTube link (optional)</label>
                  <input className="w-full rounded-lg border px-3 py-2" placeholder="https://youtu.be/..." />
                </div>
                <div className="space-y-3">
                  <label className="block text-sm">Description</label>
                  <textarea className="w-full rounded-lg border px-3 py-2" rows={6} placeholder="What viewers will learn" />
                  <div className="flex gap-2 text-sm">
                    <button type="submit" className="px-3 py-2 rounded-lg bg-slate-900 text-white">Add video</button>
                    <button type="button" className="px-3 py-2 rounded-lg border">Upload file</button>
                  </div>
                </div>
              </form>
              <div className="mt-6 grid md:grid-cols-2 gap-4">
                {[1,2].map(i => (
                  <div key={i} className="p-4 border rounded-xl bg-white space-y-2">
                    <div className="flex items-start justify-between">
                      <div><div className="font-semibold">How to answer: Tell me about yourself</div><div className="text-xs text-slate-500">YouTube • https://youtu.be/demo</div></div>
                      <span className="px-2 py-1 text-xs rounded-full bg-slate-100 border">6,500 views</span>
                    </div>
                    <p className="text-sm text-slate-600">Structure + sample answers.</p>
                    <div className="text-xs text-slate-500">Monetization: R10 per 10,000 views • Ads enabled</div>
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                      <button className="px-3 py-1.5 rounded-lg border">+1,000</button>
                      <button className="px-3 py-1.5 rounded-lg border">+10,000</button>
                      <button className="px-3 py-1.5 rounded-lg border">Edit</button>
                      <button className="px-3 py-1.5 rounded-lg border text-red-600">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4"><AdBox /></div>
            </Section>
          )}

          {/* My Videos */}
          {tab === "myvideos" && (
            <Section title="My Videos" subtitle="Manage your uploaded videos and claim earnings (private).">
              <div className="p-4 border rounded mb-3 bg-white">
                <div className="flex items-start justify-between">
                  <div className="font-semibold">How to answer: Tell me about yourself</div>
                  <span className="px-2 py-1 text-xs rounded-full bg-slate-100 border">6,500 views</span>
                </div>
                <p className="text-sm text-slate-600 mt-1">Structure + sample answers.</p>
                <div className="flex flex-wrap gap-2 mt-2 text-sm">
                  <button className="border px-2 py-1">+1k views</button>
                  <button className="border px-2 py-1 text-red-600">Delete</button>
                  <button className="border px-2 py-1 bg-emerald-600 text-white">Claim R0</button>
                </div>
              </div>
            </Section>
          )}

          {/* File Tools */}
          {tab === "tools" && (
            <Section title="File Tools" subtitle="Compress documents/images and convert between PDF and Word (demo).">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-800">Compress</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-2 rounded-lg border text-sm">Upload file</button>
                      <div className="text-xs text-slate-600">No file chosen</div>
                    </div>
                    <label className="block text-sm">Target size (MB)</label>
                    <input type="range" min={0.2} max={10} step={0.1} className="w-full" />
                    <div className="flex gap-2 text-sm">
                      <button onClick={()=>simulateCompress()} className="px-3 py-2 rounded-lg bg-slate-900 text-white">Compress</button>
                      <button className="px-3 py-2 rounded-lg border">Advanced</button>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-800">Convert</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-2 rounded-lg border text-sm">Upload file</button>
                      <div className="text-xs text-slate-600">No file chosen</div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div><label className="block text-sm">From</label><select className="w-full rounded-lg border px-3 py-2"><option>PDF</option><option>DOCX</option><option>JPG</option><option>PNG</option></select></div>
                      <div><label className="block text-sm">To</label><select className="w-full rounded-lg border px-3 py-2"><option>PDF</option><option>DOCX</option><option>JPG</option><option>PNG</option></select></div>
                    </div>
                    <div className="flex gap-2 text-sm">
                      <button onClick={()=>simulateConvert()} className="px-3 py-2 rounded-lg bg-slate-900 text-white">Convert</button>
                      <button className="px-3 py-2 rounded-lg border">Batch</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4"><AdBox /></div>
            </Section>
          )}

          {/* Wallet */}
          {tab === "wallet" && (
            <Section title="Referrals & Wallet" subtitle="Earn R20 per referral. Withdraw at R200.">
              <div className="space-y-5">
                <div className="p-4 rounded-xl bg-slate-100 border flex items-center justify-between">
                  <div>
                    <div className="text-sm">Your referral link</div>
                    <div className="font-mono text-xs">https://hireready.ai/r/your-code</div>
                  </div>
                  <button className="px-3 py-2 rounded-lg bg-slate-900 text-white text-sm">Copy</button>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-xl bg-white space-y-2 md:col-span-1">
                    <div className="text-sm font-semibold">Wallet balance</div>
                    <div className="text-3xl font-bold">R 40</div>
                    <p className="text-xs text-slate-500">Minimum withdrawal R200 • EFT 1-3 business days</p>
                    <button onClick={()=>withdraw()} className="px-3 py-2 rounded-lg bg-sky-600 text-white text-sm">Request Withdrawal</button>
                  </div>
                  <div className="p-4 border rounded-xl bg-white space-y-2 md:col-span-2">
                    <div className="text-sm font-semibold">Withdrawal details</div>
                    <div className="grid md:grid-cols-2 gap-3">
                      <input className="w-full rounded-lg border px-3 py-2 text-sm" placeholder="Account holder" />
                      <input className="w-full rounded-lg border px-3 py-2 text-sm" placeholder="Account number" />
                      <input className="w-full rounded-lg border px-3 py-2 text-sm" placeholder="Bank" />
                      <input className="w-full rounded-lg border px-3 py-2 text-sm" placeholder="Branch code" />
                    </div>
                    <p className="text-[11px] text-slate-500">We pay by EFT to South African banks.</p>
                  </div>
                </div>
                <AdBox />
                <div className="text-xs text-slate-500">Referral policy: You earn R20 when your friend subscribes to Premium (first month).</div>
              </div>
            </Section>
          )}

          {/* Pricing */}
          {tab === "pricing" && (
            <Section title="Choose your plan" subtitle="Free preview forever. Pay R60 to unlock downloads + unlimited assistant.">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl border bg-white">
                  <div className="text-sm font-semibold">Free</div>
                  <div className="text-3xl font-bold mt-1">R 0</div>
                  <ul className="text-sm mt-3 space-y-2 list-disc pl-5">
                    <li>Preview CV (watermark)</li>
                    <li>2 assistant tokens/month</li>
                    <li>Ads visible</li>
                    <li>View/post jobs</li>
                    <li>Use File Tools (limits)</li>
                  </ul>
                  <button onClick={()=>setTab("builder")} className="mt-4 px-4 py-2 rounded-xl border text-sm">Continue free</button>
                </div>
                <div className="p-5 rounded-2xl border bg-white ring-2 ring-sky-600">
                  <div className="text-sm font-semibold">Premium</div>
                  <div className="text-3xl font-bold mt-1">R 60 / mo</div>
                  <ul className="text-sm mt-3 space-y-2 list-disc pl-5">
                    <li>Unlock DOCX & PDF downloads</li>
                    <li>Unlimited assistant answers</li>
                    <li>Higher file size limits</li>
                    <li>Referral: earn R20 per friend</li>
                    <li>Ads stay visible (your rule)</li>
                  </ul>
                  <button className="mt-4 px-4 py-2 rounded-xl bg-sky-600 text-white text-sm">Upgrade (simulate)</button>
                </div>
              </div>
            </Section>
          )}
        </div>

        <div className="space-y-6">
          <Section title="Quick actions" subtitle="Shortcuts">
            <div className="grid grid-cols-2 gap-3 text-sm">
              {tabs.map((t) => (
                <button key={t.id} onClick={() => setTab(t.id)} className="px-3 py-2 rounded-lg border">{t.label}</button>
              ))}
            </div>
          </Section>
          <AdBox />
        </div>
      </main>

      <footer className="py-10 text-center text-xs text-slate-500 hidden md:block">Brandless assistant • R60/mo Premium • R20 referral • Videos: R10 per 10,000 views • File Tools demo only</footer>
    </div>
  );
}
// -- END FULL UI COMPONENT --
