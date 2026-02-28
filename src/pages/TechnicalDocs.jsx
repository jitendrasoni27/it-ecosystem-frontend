/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import {
    FileText,
    Layers,
    Database,
    Cpu,
    Workflow,
    CheckCircle,
    Code,
    Layout,
    ArrowRight,
    Search,
    DownloadCloud,
    Table,
    Share2,
    Check,
    ShieldCheck
} from 'lucide-react';
import SEO from '../components/SEO';

const QuickNav = ({ Sections }) => {
    return (
        <Motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="fixed right-6 top-32 z-50 hidden xl:flex flex-col gap-2 p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl"
        >
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2 px-2 text-center">Protocol Links</p>
            {Sections.map((Section) => (
                <a
                    key={Section.id}
                    href={`#${Section.id}`}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/10 text-slate-500 hover:text-primary transition-all group"
                >
                    <Section.icon className="w-4 h-4" />
                    <span className="text-[11px] font-bold tracking-tight whitespace-nowrap">{Section.title}</span>
                </a>
            ))}
        </Motion.div>
    );
};

const TechnicalDocs = ({ IsDashboard = false }) => {
    const documentationSections = [
        { id: 'requirements', title: 'Requirements', icon: FileText },
        { id: 'workflow', title: 'Workflow', icon: Workflow },
        { id: 'architecture', title: 'Architecture', icon: Layers },
        { id: 'database', title: 'Schema', icon: Database },
        { id: 'simple-manual', title: 'Simple Manual', icon: Layout },
    ];

    const handleDownloadDocx = () => {
        const content = document.getElementById('docs-content').innerHTML;
        const header = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
                        <head><meta charset='utf-8'><title>Technical Documentation</title>
                        <style>
                            body { font-family: 'Segoe UI', serif; padding: 40px; }
                            h1 { color: #000957; font-size: 24pt; }
                            h2 { color: #000957; font-size: 18pt; margin-top: 20pt; border-bottom: 2px solid #000957; }
                            h3 { color: #333; font-size: 14pt; }
                            table { border-collapse: collapse; width: 100%; margin: 15pt 0; }
                            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; font-size: 10pt; }
                            th { background: #f0f0f0; }
                            pre { background: #1e293b; color: #e2e8f0; padding: 15px; border-radius: 8px; font-family: 'Courier New', monospace; font-size: 9pt; }
                        </style></head><body>`;
        const footer = "</body></html>";
        const sourceHtml = header + content + footer;

        const blob = new Blob(['\ufeff', sourceHtml], {
            type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Soniapps_IT_Ecosystem_Manifesto.docx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDownloadXlsx = () => {
        const rows = [
            ['IT ECOSYSTEM TECHNICAL MANIFESTO'],
            [],
            ['SECTION', 'IDENTIFIER', 'SPECIFICATIONS', 'REMARKS'],
            ['Requirements', 'F-001', 'Multi-tenant Auth', 'Secure JWT Nodes'],
            ['Requirements', 'F-002', 'Dynamic Analytics', 'Real-time Telemetry'],
            ['Architecture', 'Frontend', 'React 19, Vite, Tailwind', 'Edge Latency < 50ms'],
            ['Architecture', 'Backend', 'Spring Boot, JPA, MySQL', 'ACID Compliance'],
            ['Database', 'Entity: User', 'auth_nodes', 'Bcrypt encrypted'],
            ['Database', 'Entity: Product', 'inventory_nodes', 'Relational mapping'],
            ['Ecosystem', 'Workflow', 'End-to-end Job Flow', 'REST Protocol']
        ];

        let csvContent = "data:text/csv;charset=utf-8,"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "Technical_Registry_Nodes.xlsx");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className={`bg-slate-50 dark:bg-slate-950 min-h-screen ${IsDashboard ? 'pt-0' : 'pt-24'} pb-20 transition-colors duration-300 relative`}>
            {!IsDashboard && <SEO title="Technical Documentation" description="Detailed technical documentation for the IT Ecosystem platform." />}

            <QuickNav Sections={documentationSections} />

            <div id="docs-content" className={`${IsDashboard ? 'max-w-full' : 'max-w-7xl mx-auto'} px-4 sm:px-6 lg:px-8`}>
                {/* Hero Header */}
                <div className="relative mb-20">
                    <Motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tight uppercase">
                            Technical <span className="text-primary italic">Manifesto</span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                            Enterprise-grade architectural blueprint for the Soniapps IT Ecosystem.
                            Synchronizing Presentation, Logic, and Data protocols.
                        </p>

                        <div className="mt-10 flex flex-wrap justify-center gap-4">
                            <button
                                onClick={handleDownloadDocx}
                                className="flex items-center gap-3 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl border border-white/10"
                            >
                                <DownloadCloud className="w-5 h-5" /> Export DOCX
                            </button>
                            <button
                                onClick={handleDownloadXlsx}
                                className="flex items-center gap-3 px-8 py-4 bg-emerald-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl"
                            >
                                <Table className="w-5 h-5" /> Export XLSX
                            </button>
                        </div>
                    </Motion.div>
                </div>

                {/* Requirement Analysis */}
                <Section title="Requirement Analysis" icon={FileText} id="requirements">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
                                <Layout className="w-32 h-32 text-primary" />
                            </div>
                            <h3 className="text-2xl font-black mb-6 flex items-center gap-3 text-slate-900 dark:text-white">
                                <Check className="text-emerald-500 w-6 h-6" /> Functional
                            </h3>
                            <ul className="space-y-4 text-slate-600 dark:text-slate-400 text-sm font-semibold">
                                {["Secure Identity Management System", "Automated Application Pipelines", "Real-time Telemetry Dashboards", "E-commerce Persistence Protocol"].map((item, i) => (
                                    <li key={i} className="flex gap-4">
                                        <span className="text-primary font-black opacity-40">0{i + 1}</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-slate-900 p-10 rounded-[2.5rem] border border-slate-800 shadow-2xl relative overflow-hidden group">
                            <h3 className="text-2xl font-black mb-6 text-white flex items-center gap-3">
                                <ShieldCheck className="text-primary w-6 h-6" /> Critical Metrics
                            </h3>
                            <div className="space-y-6">
                                {[
                                    { label: 'Latency Node Response', val: '98%', color: 'from-blue-600 to-primary' },
                                    { label: 'Ecosystem Scalability', val: '92%', color: 'from-emerald-600 to-emerald-400' },
                                    { label: 'Security Encryption Depth', val: '100%', color: 'from-purple-600 to-indigo-500' }
                                ].map((item, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-slate-400">
                                            <span>{item.label}</span>
                                            <span>{item.val}</span>
                                        </div>
                                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                            <Motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: item.val }}
                                                transition={{ duration: 1, delay: i * 0.2 }}
                                                className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Section>

                {/* Workflow Section */}
                <Section title="System Workflow" icon={Workflow} id="workflow">
                    <div className="bg-white dark:bg-slate-900 p-10 md:p-16 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden text-center">
                        <h3 className="text-xl font-bold mb-12 uppercase tracking-[0.3em] text-slate-400">Interactive Execution Path</h3>
                        <div className="relative mb-16">
                            <WorkflowDiagram />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {[
                                { t: 'Client Node', d: 'React state capture' },
                                { t: 'Auth Guard', d: 'JWT validation' },
                                { t: 'API Logic', d: 'Spring controller' },
                                { t: 'D-Layer', d: 'JPA persistence' }
                            ].map((s, i) => (
                                <div key={i} className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 group hover:border-primary transition-all">
                                    <h4 className="font-black text-[10px] text-primary uppercase mb-2">Stage 0{i + 1}</h4>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white mb-1">{s.t}</p>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold tracking-tight">{s.d}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Section>

                {/* Architecture Section */}
                <Section title="Architecture Layers" icon={Layers} id="architecture">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        <div className="lg:col-span-4 space-y-6">
                            <div className="bg-primary p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden group">
                                <Layers className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 group-hover:scale-110 transition-transform" />
                                <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">Presentation</h3>
                                <p className="text-xs font-bold opacity-70 mb-4">React 19 / Vite / Motion</p>
                                <p className="text-[11px] font-medium leading-relaxed opacity-80">
                                    Decoupled UI utilizing hardware-accelerated animations and atomic component protocols.
                                </p>
                            </div>
                            <div className="bg-slate-900 border border-emerald-500/20 p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden group">
                                <Cpu className="absolute -right-4 -bottom-4 w-32 h-32 text-emerald-500/10 group-hover:scale-110 transition-transform" />
                                <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter text-emerald-400">Logic Core</h3>
                                <p className="text-xs font-bold text-emerald-500/50 mb-4">Spring Boot / Java 17</p>
                                <p className="text-[11px] font-medium leading-relaxed opacity-80">
                                    Multithreaded RESTful ecosystem with automated transaction management and security filters.
                                </p>
                            </div>
                        </div>
                        <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[2rem] border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center">
                            <h3 className="text-lg font-black uppercase tracking-widest text-slate-400 mb-8">Integrated Stack Graph</h3>
                            <ArchitectureDiagram />
                        </div>
                    </div>
                </Section>

                {/* Simple Code Manual - New Section */}
                <Section title="Simple Code Manual" icon={Layout} id="simple-manual">
                    <div className="space-y-12">
                        <div className="bg-primary/5 border border-primary/20 rounded-[2.5rem] p-8 md:p-12">
                            <div className="flex items-start gap-6 mb-10">
                                <div className="p-4 bg-primary text-white rounded-2xl shadow-lg">
                                    <Search className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">The "Plain English" Guide</h3>
                                    <p className="text-slate-500 dark:text-slate-400 font-bold mt-2">Code can look scary, but it's just a set of instructions. Here's how our system works in simple words.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                                {/* Concept 5: Project Structure */}
                                <SimpleExplainCard
                                    title="5. The Project Map"
                                    description="How our files and folders are organized."
                                    syntaxKeys={[
                                        { key: 'src/pages', mean: 'The "Main Screens" you see (Home, Login, etc.).' },
                                        { key: 'src/components', mean: 'Small "Building Blocks" like buttons or navbars.' },
                                        { key: 'src/App.jsx', mean: 'The "Master Controller" that decides which page to show.' }
                                    ]}
                                    logic="Think of the project like a Lego set. 'Components' are the individual bricks, and 'Pages' are the finished models. We keep our bricks in the 'components' folder and our finished models in the 'pages' folder. Everything starts from 'main.jsx', which tells the browser to start building our app."
                                />

                                {/* Concept 6: Component Anatomy */}
                                <SimpleExplainCard
                                    title="6. Anatomy of a Component"
                                    description="The 4 basic parts of every file."
                                    syntaxKeys={[
                                        { key: 'Import', mean: 'Saying "I need these tools" at the top.' },
                                        { key: 'Logic', mean: 'The "Brain" part where we do calculations.' },
                                        { key: 'JSX (Return)', mean: 'The "Body" part that you see on screen.' },
                                        { key: 'Export', mean: 'Sharing the component so others can use it.' }
                                    ]}
                                    logic="Every file follows a simple pattern: 1. Get Tools (Imports), 2. Think (Logic), 3. Show (Return), 4. Share (Export). This keeps our code predictable and easy to fix if something breaks."
                                />

                                {/* Concept 1: Login */}
                                <SimpleExplainCard
                                    title="1. The Login Gate"
                                    description="How we check who you are before letting you inside."
                                    syntaxKeys={[
                                        { key: 'useState', mean: 'A "Memory Box" that saves what you type in the box.' },
                                        { key: 'axios.post', mean: 'Sending a "Digital Letter" to the computer server.' },
                                        { key: 'e.preventDefault()', mean: 'Telling the browser "Don\'t refresh the page yet, I am working!"' }
                                    ]}
                                    logic="When you click 'Sign In', the code packs your email and password into a packet. It sends this to our 'Security Guard' (Backend). If the Guard says 'Yes', we save a 'Gold Key' (Token) in your browser so you don't have to log in again for every page."
                                />

                                {/* Concept 2: Job Application */}
                                <SimpleExplainCard
                                    title="2. Sending a Job Application"
                                    description="How we move your Resume from your laptop to our office."
                                    syntaxKeys={[
                                        { key: 'FormData', mean: 'A "Digital Bag" used to carry files and text together.' },
                                        { key: 'Multipart', mean: 'A special way to send files so they don\'t break.' },
                                        { key: 'storeFile', mean: 'Putting your Resume file into a safe "Locker" on our server.' }
                                    ]}
                                    logic="A resume isn't just text; it's a file. Our code creates a 'Bigger Bag' (FormData), puts your name, email, and that PDF file inside. It travels over the internet to our Backend. The Backend puts the file in a folder and saves the 'Locker Number' in the database so we can find it later."
                                />

                                {/* Concept 3: Admin Dashboard */}
                                <SimpleExplainCard
                                    title="3. Admin Dashboard Analytics"
                                    description="How we turn messy data into those pretty graphs."
                                    syntaxKeys={[
                                        { key: 'useEffect', mean: 'Doing a task automatically as soon as the page opens.' },
                                        { key: 'Recharts', mean: 'A "Magic Pen" that draws graphs using numbers we give it.' },
                                        { key: '@RestController', mean: 'A "Waiter" in the kitchen waiting for your order.' }
                                    ]}
                                    logic="The moment an Admin opens the dashboard, the code 'shouts' to the server: 'Give me the latest stats!'. The server checks the Database, counts all users and orders, and sends back a list of numbers. Recharts then draws the bars and lines so it looks nice and easy to read."
                                />

                                {/* Concept 4: Database Schema */}
                                <SimpleExplainCard
                                    title="4. The Database Ledger"
                                    description="Where we store everything permanently."
                                    syntaxKeys={[
                                        { key: 'BIGINT', mean: 'A very large number box (1, 2, 3... up to trillions).' },
                                        { key: 'PK (Primary Key)', mean: 'A "Roll Number" that is unique for every single person.' },
                                        { key: 'VARCHAR', mean: 'A box for typing words like names or emails.' }
                                    ]}
                                    logic="Think of the Database like a giant Excel sheet with different tabs. One tab for 'Users', one for 'Products'. We use these unique 'Roll Numbers' (IDs) to connect them. For example, Order #50 belongs to User #10. This keeps everything organized."
                                />
                            </div>
                        </div>
                    </div>
                </Section>

                {/* Database Schema */}
                <Section title="Database Schema" icon={Database} id="database">
                    <div className="bg-slate-100/50 dark:bg-slate-900/50 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800">
                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
                            <div className="xl:col-span-2 space-y-6">
                                <SchemaTable
                                    name="registry_users"
                                    cols={[
                                        { n: 'id', t: 'BIGINT', k: 'PK' },
                                        { n: 'email', t: 'VARCHAR', k: 'UQ' },
                                        { n: 'role', t: 'ENUM' },
                                        { n: 'hash_node', t: 'TEXT' }
                                    ]}
                                />
                                <SchemaTable
                                    name="inventory_assets"
                                    cols={[
                                        { n: 'id', t: 'BIGINT', k: 'PK' },
                                        { n: 'asset_title', t: 'VARCHAR' },
                                        { n: 'base_unit_cost', t: 'DOUBLE' },
                                        { n: 'category_tag', t: 'TEXT' }
                                    ]}
                                />
                            </div>
                            <div className="bg-white dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-inner h-fit lg:sticky lg:top-32">
                                <h4 className="text-[10px] font-black uppercase text-primary tracking-[0.25em] mb-6">Entity Connection Graph</h4>
                                <div className="space-y-4">
                                    {[
                                        { t: 'User ↔ Application', d: 'Transactional binding logic' },
                                        { t: 'Product ↔ Analytics', d: 'Historical data sequencing' },
                                        { t: 'Partner ↔ Registry', d: 'Vetted verification nodes' }
                                    ].map((rel, i) => (
                                        <div key={i} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 group hover:border-primary transition-colors cursor-default">
                                            <p className="text-xs font-black dark:text-white mb-1">{rel.t}</p>
                                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">{rel.d}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* Code Deep Dive */}
                <Section title="Code Deep Dive" icon={Code} id="code-deep-dive">
                    <div className="flex flex-col gap-16">
                        <div className="group">
                            <h3 className="text-2xl font-black mb-6 text-slate-900 dark:text-white flex items-center gap-4">
                                <span className="p-2 bg-primary/10 rounded-lg text-primary text-xs">01</span>
                                Frontend Interaction Logic
                            </h3>
                            <CodeBlock
                                code={`const submitEcosystemApplication = async (nodeData) => {
    // Stage 1: Data Normalization
    const buffer = new FormData();
    buffer.append('payload_node', nodeData.file);
    buffer.append('registry_id', nodeData.uid);

    // Stage 2: XHR Protocol execution
    const response = await axios.post('/v1/api/protocol/execute', buffer, {
        headers: { 'X-Node-Type': 'multipart' }
    });

    return response.status === 200;
};`}
                                language="javascript"
                                title="src/hooks/useEcosystem.js"
                            />
                        </div>

                        <div className="group">
                            <h3 className="text-2xl font-black mb-6 text-slate-900 dark:text-white flex items-center gap-4">
                                <span className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500 text-xs">02</span>
                                Backend Protocol Orchestration
                            </h3>
                            <CodeBlock
                                code={`@Transactional
public NodeResponse processProtocol(EcosystemRequest request) {
    // 1. Decrypt Authorization Node
    AuthContext.validate(request.getJwt());

    // 2. Data Persistence Trigger
    AssetNode asset = assetRepository.findById(request.getId())
        .orElseThrow(NodeNotFoundException::new);

    // 3. System Log Serialization
    logService.record(asset, "PROTOCOL_EXECUTION");
    
    return NodeResponse.success(asset);
}`}
                                language="java"
                                title="EcosystemService.java"
                            />
                        </div>
                    </div>
                </Section>
            </div>
        </div>
    );
};

const Section = ({ title, icon: IconComponent, children, id }) => (
    <div id={id} className="mb-32 scroll-mt-32">
        <Motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-5 mb-12"
        >
            <div className="p-4 bg-white dark:bg-slate-900 rounded-[1.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 text-primary">
                <IconComponent className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                {title}
            </h2>
        </Motion.div>
        {children}
    </div>
);

const SchemaTable = ({ name, cols }) => (
    <div className="bg-white dark:bg-slate-950 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl group hover:shadow-primary/10 transition-all">
        <div className="px-6 py-4 bg-slate-900 flex justify-between items-center border-b border-white/5">
            <span className="text-xs font-black text-white uppercase tracking-[0.3em]">{name}</span>
            <Database className="w-4 h-4 text-primary opacity-40 group-hover:opacity-100 transition-opacity" />
        </div>
        <table className="w-full text-left text-xs">
            <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/40 text-slate-400 font-black uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                    <th className="px-6 py-4">Field Identity</th>
                    <th className="px-6 py-4">Data Protocol</th>
                    <th className="px-6 py-4 text-center">Attr</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {cols.map((c, i) => (
                    <tr key={i} className="hover:bg-primary/[0.02] transition-colors">
                        <td className="px-6 py-4 font-bold text-slate-900 dark:text-slate-200">{c.n}</td>
                        <td className="px-6 py-4 font-mono text-slate-500 uppercase tracking-tighter">{c.t}</td>
                        <td className="px-6 py-4 text-center">
                            {c.k && (
                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-black border ${c.k === 'PK' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                                    }`}>
                                    {c.k}
                                </span>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const SimpleExplainCard = ({ title, description, syntaxKeys, logic }) => (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col h-full group hover:border-primary/40 transition-all">
        <h4 className="text-xl font-black text-slate-900 dark:text-white mb-2">{title}</h4>
        <p className="text-xs font-bold text-primary uppercase tracking-widest mb-4 opacity-70 italic">{description}</p>

        <div className="flex-grow">
            <h5 className="text-[10px] font-black uppercase text-slate-400 mb-3 tracking-[0.2em]">Logic (Simple Words)</h5>
            <p className="text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium mb-6">
                {logic}
            </p>

            <h5 className="text-[10px] font-black uppercase text-slate-400 mb-3 tracking-[0.2em]">Code Terms (What they mean)</h5>
            <div className="space-y-3">
                {syntaxKeys.map((item, i) => (
                    <div key={i} className="flex flex-col gap-1 p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 group-hover:bg-primary/[0.03] transition-colors">
                        <code className="text-xs font-black text-primary font-mono">{item.key}</code>
                        <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">{item.mean}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const ArchitectureDiagram = () => (
    <svg viewBox="0 0 500 400" className="w-full max-w-lg drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
        <defs>
            <filter id="glow-rect" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
        </defs>

        <Motion.g initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <rect x="100" y="40" width="300" height="70" rx="20" className="fill-white dark:fill-slate-800 stroke-primary stroke-2" />
            <text x="250" y="80" textAnchor="middle" className="text-sm font-black fill-slate-900 dark:fill-white uppercase tracking-[0.2em]">Presentation Protocol</text>
            <text x="250" y="95" textAnchor="middle" className="text-[10px] font-bold fill-slate-400 capitalize">React 19 Hooks & Context</text>
        </Motion.g>

        <path d="M250 110 V160" className="stroke-slate-200 dark:stroke-slate-800 stroke-2 fill-none stroke-dasharray-4" />

        <Motion.g initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <rect x="80" y="160" width="340" height="80" rx="20" className="fill-slate-900 stroke-emerald-500/50 stroke-2" />
            <text x="250" y="200" textAnchor="middle" className="text-sm font-black fill-white uppercase tracking-[0.2em]">Ecosystem Registry API</text>
            <text x="250" y="215" textAnchor="middle" className="text-[10px] font-bold fill-emerald-500 capitalize">Spring Security & REST Services</text>
        </Motion.g>

        <path d="M250 240 L250 290" className="stroke-slate-200 dark:stroke-slate-800 stroke-2 fill-none stroke-dasharray-4" />

        <Motion.g initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <rect x="120" y="290" width="260" height="70" rx="35" className="fill-primary stroke-white/20 stroke-2" />
            <text x="250" y="330" textAnchor="middle" className="text-sm font-black fill-white uppercase tracking-[0.2em]">Persistence Node</text>
            <text x="250" y="345" textAnchor="middle" className="text-[10px] font-bold fill-white/60 capitalize">MySQL 8.0 Cluster</text>
        </Motion.g>
    </svg>
);

const WorkflowDiagram = () => (
    <svg viewBox="0 0 1000 240" className="w-full">
        <defs>
            <linearGradient id="mainFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
        </defs>

        <circle cx="150" cy="120" r="45" className="fill-slate-100 dark:fill-slate-900 stroke-slate-200 dark:stroke-slate-800 stroke-2" />
        <Layout className="w-8 h-8 text-primary absolute left-[134px] top-[104px]" />

        <path d="M195 120 L355 120" className="stroke-[url(#mainFlow)] stroke-2 stroke-dasharray-8 animate-dash" />

        <circle cx="400" cy="120" r="45" className="fill-slate-100 dark:fill-slate-900 stroke-slate-200 dark:stroke-slate-800 stroke-2" />
        <Cpu className="w-8 h-8 text-secondary absolute left-[384px] top-[104px]" />

        <path d="M445 120 L605 120" className="stroke-[url(#mainFlow)] stroke-2 stroke-dasharray-8" />

        <circle cx="650" cy="120" r="45" className="fill-slate-100 dark:fill-slate-900 stroke-slate-200 dark:stroke-slate-800 stroke-2" />
        <Database className="w-8 h-8 text-emerald-500 absolute left-[634px] top-[104px]" />

        <path d="M695 120 L855 120" className="stroke-[url(#mainFlow)] stroke-2 stroke-dasharray-8" />

        <circle cx="900" cy="120" r="45" className="fill-primary text-white shadow-2xl" />
        <CheckCircle className="w-8 h-8 text-white absolute left-[884px] top-[104px]" />
    </svg>
);

const CodeBlock = ({ code, language, title }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="rounded-[2rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-3xl bg-[#0d1117] transition-all hover:border-primary/30">
            <div className="px-6 py-4 bg-slate-900 border-b border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{title}</span>
                </div>
                <button onClick={handleCopy} className="p-2 hover:bg-white/5 rounded-lg text-slate-500 hover:text-white transition-all">
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                </button>
            </div>
            <pre className="p-8 overflow-x-auto custom-scrollbar">
                <code className={`language-${language} text-[13px] leading-relaxed font-mono text-blue-200 block`}>
                    {code}
                </code>
            </pre>
        </div>
    );
};

export default TechnicalDocs;
