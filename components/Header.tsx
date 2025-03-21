import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-secondary text-white py-4">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">אור להובלות</h1>
        <ul className="flex space-x-4">
          <li><Link href="/">בית</Link></li>
          <li><Link href="/about">אודות</Link></li>
          <li><Link href="/services">שירותים</Link></li>
          <li><Link href="/contact">צור קשר</Link></li>
        </ul>
      </nav>
    </header>
  );
}
