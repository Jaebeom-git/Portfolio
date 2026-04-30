import type { Metadata } from "next";
import Link from "next/link";
import {
  awards,
  cvHighlights,
  education,
  pageSummaries,
  profile,
  publications,
  researchExperiences,
  skills,
} from "@/src/lib/portfolioData";
import { inlineMarkdown } from "@/src/lib/markdownContent";
import { absoluteUrl, site, withBasePath } from "@/src/lib/site";

export const metadata: Metadata = {
  title: pageSummaries.cv.title,
  description: pageSummaries.cv.description,
  alternates: { canonical: absoluteUrl("/cv/") },
  openGraph: {
    title: `${pageSummaries.cv.title} | Jaebeom Jo`,
    description: pageSummaries.cv.description,
    url: absoluteUrl("/cv/"),
  },
};

function RichLine({ value }: { value: string }) {
  return <span dangerouslySetInnerHTML={{ __html: inlineMarkdown(value) }} />;
}

function ToggleSection({
  id,
  title,
  children,
  open = true,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  open?: boolean;
}) {
  return (
    <details id={id} className="toggle-section" open={open}>
      <summary>{title}</summary>
      <div className="toggle-body">{children}</div>
    </details>
  );
}

function educationLogo(lines: string[]) {
  const text = lines.join(" ");
  if (/GIST|Gwangju Institute/i.test(text)) return "/logos/gist-logo.png";
  if (/Chungnam National University/i.test(text)) return "/logos/cnu-logo.png";
  return "";
}

export default function CvPage() {
  return (
    <main className="notion-page">
      <nav className="topbar" aria-label="Primary navigation">
        <Link className="brand" href="/">
          <span className="brand-mark">JB</span>
          <span>{site.owner}</span>
        </Link>
        <div className="nav-links">
          <Link href="/">Main</Link>
          <Link href="/projects/">Research and Projects</Link>
          <Link href="/coursework/">Coursework and Activities</Link>
          <Link href="/history/">History</Link>
        </div>
      </nav>

      <section id="contact" className="section-shell page-header cv-page-header">
        <div>
          <p className="eyebrow">Curriculum Vitae</p>
          <h1>{pageSummaries.cv.title}</h1>
          <p className="name-line">{profile.englishName}</p>
          <div className="contact-list">
            <a href={`mailto:${profile.email}`}>✉️ {profile.email}</a>
            <a href={profile.linkedin}>
              <img className="contact-logo" src={withBasePath("/logos/linkedin-logo.svg")} alt="" />
              LinkedIn
            </a>
            <a href={profile.scholar}>🎓 Google Scholar</a>
          </div>
        </div>
        <div className="cv-portrait-card">
          <img className="cv-portrait" src={withBasePath(profile.cvPhoto)} alt="Portrait of Jaebeom Jo" />
        </div>
      </section>

      <section className="section-shell cv-content-layout">
        <aside className="content-toc" aria-label="C.V. contents">
          <p className="eyebrow">Contents</p>
          <nav>
            <Link href="#contact">
              <span>✉️</span>
              Contact
            </Link>
            {cvHighlights.map((item) => (
              <Link href={item.href} key={item.title}>
                <span>{item.icon}</span>
                {item.title}
              </Link>
            ))}
          </nav>
        </aside>

        <div className="cv-toggle-stack">
          <ToggleSection id="education" title="Education">
            <div className="education-list">
              {education.map((item) => {
                const logo = educationLogo(item.lines);
                return (
                  <div className="education-card" key={item.degree}>
                    <div className="education-card-header">
                      {logo ? (
                        <span className="notion-icon image-icon education-logo">
                          <img src={withBasePath(logo)} alt={`${item.degree} institution logo`} />
                        </span>
                      ) : (
                        <span className="notion-icon">🎓</span>
                      )}
                      <div>
                        <h3>{item.degree}</h3>
                        {item.lines[0] ? <p><RichLine value={item.lines[0]} /></p> : null}
                      </div>
                    </div>
                    {item.lines.length > 1 ? (
                      <ul className="education-meta-list">
                        {item.lines.slice(1).map((line) => (
                          <li key={line}><RichLine value={line} /></li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </ToggleSection>

          <ToggleSection id="publications" title="Publications">
            {publications.map((section) => (
              <details className="nested-toggle-section" open key={section.title}>
                <summary>{section.title}</summary>
                <ol className="rich-list">
                  {section.items.map((item) => <li key={item}><RichLine value={item} /></li>)}
                </ol>
              </details>
            ))}
          </ToggleSection>

          <ToggleSection id="experience" title="Experience">
            <ul className="rich-list">
              {researchExperiences.map((item) => <li key={item}><RichLine value={item} /></li>)}
            </ul>
          </ToggleSection>

          <ToggleSection id="skills" title="Skills and Techniques">
            <ul className="rich-list">
              {skills.map((skill) => <li key={skill}><RichLine value={skill} /></li>)}
            </ul>
          </ToggleSection>

          <ToggleSection id="awards-and-honors" title="Awards and Honors">
            <ul className="rich-list">
              {awards.map((award) => <li key={award}><RichLine value={award} /></li>)}
            </ul>
          </ToggleSection>
        </div>
      </section>
    </main>
  );
}
