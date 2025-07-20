import Link from "next/link";

export default function Navbar({ cartCount = 0, onCartClick }) {
  return (
    <nav className="navbar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <h1>Foodie App</h1>
      <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <Link href="/login/user">User Login</Link>
        <Link href="/login/admin">Admin Login</Link>
        <button
          onClick={onCartClick}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            position: 'relative',
            marginLeft: 16,
            fontSize: 22
          }}
          aria-label="View cart"
        >
          <span role="img" aria-label="cart">🛒</span>
          {cartCount > 0 && (
            <span style={{
              position: 'absolute',
              top: -6,
              right: -10,
              background: '#ff4d4f',
              color: '#fff',
              borderRadius: '50%',
              padding: '2px 7px',
              fontSize: 12,
              fontWeight: 'bold',
              minWidth: 20,
              textAlign: 'center',
              lineHeight: '16px'
            }}>{cartCount}</span>
          )}
        </button>
      </div>
    </nav>
  );
}
