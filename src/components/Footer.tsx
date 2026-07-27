import { Link } from "react-router-dom";
import logo from "../assets/logos/LogoSmall.png"

const columns = [
  {
    title: "Company",
    links: ["About", "Careers", "Contact", "Press"],
  },
  {
    title: "Resources",
    links: ["Guides", "Templates", "Glossary", "FAQs"],
  },
  {
    title: "Legal",
    links: ["Privacy policy", "Terms of use", "Cookies"],
  },
];

const Footer = () => {
  return (
    <footer className="bg-ink text-cloud px-5 py-3 flex flex-col justify-center xl:items-center ">
      <div className=" grid grid-cols-1 xl:min-w-6xl max-w-7xl gap-10 py-16 px-4 md:grid-cols-5 ">
        <div className="md:col-span-2">
          <Link to="/" className="font-display text-xl font-bold text-cloud">
            <img
              src={logo}
              alt="Our Web Logo"
              className="max-w-25"
            />
          </Link>
          <p className="mt-4 max-w-xs text-sm">
            rasoolmaryam57@gmail.com
            <br />
            +92 (325) 6822344
          </p>
          <div className="mt-6 flex gap-4">
            {["X", "in", "Ig"].map((s) => (
              <a
                key={s}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-xs hover:border-moss hover:text-moss"
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-semibold text-white">{col.title}</h4>
            <ul className="mt-4 space-y-3 text-sm">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-moss">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 py-6">
        <p className=" text-xs text-white/40">
          © 2026 Indigo. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
export default Footer