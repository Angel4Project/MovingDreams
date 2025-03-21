import React, { useEffect } from "react";
import gsap from "gsap";

export default function Footer() {
  useEffect(() => {
    gsap.fromTo(
      ".footer",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1 }
    );
  }, []);

  return (
    <footer className="footer bg-secondary text-white py-6">
      <div className="container mx-auto text-center">
        <p>© 2023 אור להובלות. כל הזכויות שמורות.</p>
        <ul className="flex justify-center space-x-4 mt-4">
          <li>
            <a href="https://wa.me/0543806524" target="_blank" rel="noopener noreferrer">
              וואטסאפ
            </a>
          </li>
          <li>
            <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer">
              פייסבוק
            </a>
          </li>
          <li>
            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
              אינסטגרם
            </a>
          </li>
          <li>
            <a href="/blog" className="hover:underline">
              בלוג
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:underline">
              צור קשר
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}