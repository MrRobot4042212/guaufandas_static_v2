import { useCallback, useEffect, useMemo, useState } from 'react';

type CartItem = {
  id: string;
  name: string;
  color: string;
  size: string;
  sku: string;
  price: number;
  currency: string;
  quantity: number;
};

const CART_KEY = 'guaufandas_cart';
const WHATSAPP_NUMBER = '34689615500';

const formatCurrency = (value: number, currency = 'EUR') =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency }).format(value);

const readCart = (): CartItem[] => {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  } catch {
    return [];
  }
};

const saveCart = (items: CartItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  document.dispatchEvent(new CustomEvent('cart:updated', { detail: items }));
};

const buildWhatsappMessage = (items: CartItem[], currency: string) => {
  if (!items.length) {
    return 'Hola! Quiero hacer un pedido, ¿podéis ayudarme?';
  }

  const lines = items.map((item) => {
    const linePrice = item.price * item.quantity;
    const label = `${item.name} (color ${item.color}, talla ${item.size})`;
    return `- ${label} x${item.quantity} — ${formatCurrency(linePrice, currency)}`;
  });

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return `Hola! Quiero hacer este pedido:\n${lines.join('\n')}\n\nTotal: ${formatCurrency(total, currency)}`;
};

export default function Cart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const count = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const totalValue = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );
  const currency = items[0]?.currency || 'EUR';

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    setItems(readCart());
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('cart-open');
    } else {
      document.body.classList.remove('cart-open');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleUpdated = () => setItems(readCart());
    document.addEventListener('cart:updated', handleUpdated);
    return () => document.removeEventListener('cart:updated', handleUpdated);
  }, []);

  const addToCart = useCallback((item: CartItem) => {
    setItems((current) => {
      const next = [...current];
      const existing = next.find((entry) => entry.sku === item.sku);
      if (existing) {
        existing.quantity += item.quantity;
      } else {
        next.push(item);
      }
      saveCart(next);
      return next;
    });
    openCart();
  }, [openCart]);

  const updateQty = useCallback((sku: string, action: 'increase' | 'decrease' | 'remove') => {
    setItems((current) => {
      if (action === 'remove') {
        const next = current.filter((entry) => entry.sku !== sku);
        saveCart(next);
        return next;
      }

      const next = current.map((entry) => {
        if (entry.sku !== sku) return entry;
        if (action === 'increase') return { ...entry, quantity: entry.quantity + 1 };
        return { ...entry, quantity: Math.max(1, entry.quantity - 1) };
      });
      saveCart(next);
      return next;
    });
  }, []);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const toggle = target?.closest?.('[data-cart-toggle]');
      if (toggle) {
        openCart();
        return;
      }

      const close = target?.closest?.('[data-cart-close]');
      if (close || target?.closest?.('[data-cart-overlay]')) {
        closeCart();
        return;
      }

      const addButton = target?.closest?.('[data-add-to-cart]');
      if (addButton) {
        const detail = addButton.closest('[data-product-detail]');
        if (!detail) return;

        const productId = detail.getAttribute('data-product-id') || '';
        const productName = detail.getAttribute('data-product-name') || 'Producto';
        const currencyValue = detail.getAttribute('data-product-currency') || 'EUR';
        const color = detail.querySelector('[data-selected-color]')?.textContent?.trim() || 'Sin color';
        const sizeButton =
          detail.querySelector('[data-size-button].selected') ||
          detail.querySelector('[data-size-button]');
        const size = sizeButton?.getAttribute('data-size') || 'Única';
        const sku = sizeButton?.getAttribute('data-sku') || `${productId}-${color}-${size}`;
        const price = Number(sizeButton?.getAttribute('data-price') || 0);

        addToCart({
          id: productId,
          name: productName,
          color,
          size,
          sku,
          price,
          currency: currencyValue,
          quantity: 1
        });
      }

      const addPackButton = target?.closest?.('[data-add-pack]');
      if (addPackButton) {
        const detail = addPackButton.closest('[data-pack-detail]');
        if (!detail) return;

        const packId = detail.getAttribute('data-pack-id') || '';
        const packName = detail.getAttribute('data-pack-name') || 'Pack';
        const currencyValue = detail.getAttribute('data-pack-currency') || 'EUR';
        const packPrice = Number(detail.getAttribute('data-pack-price') || 0);
        const matchEnabled = (detail.querySelector('[data-match-toggle]') as HTMLInputElement | null)?.checked;

        const packColorButton = detail.querySelector('[data-pack-color-main].selected') || detail.querySelector('[data-pack-color-main]');
        const packColor = matchEnabled ? (packColorButton?.getAttribute('data-color') || 'Variado') : 'Variado';
        const packSku = matchEnabled
          ? (packColorButton?.getAttribute('data-sku') || `${packId}-${packColor}`)
          : `${packId}-MIX`;

        const detailParts: string[] = [];
        detail.querySelectorAll('[data-pack-product]').forEach((product) => {
          const productName =
            product.getAttribute('data-pack-product-name') ||
            product.querySelector('.pack-item-title')?.textContent?.trim() ||
            'Producto';
          const color = product.querySelector('[data-selected-color]')?.textContent?.trim() || 'Sin color';
          const sizeButton =
            product.querySelector('[data-pack-size].selected') ||
            product.querySelector('[data-pack-size]');
          const size = sizeButton?.getAttribute('data-size') || 'Única';
          detailParts.push(`${productName}: ${size} (${color})`);
        });

        addToCart({
          id: packId,
          name: packName,
          color: packColor,
          size: detailParts.join(' + '),
          sku: packSku,
          price: packPrice,
          currency: currencyValue,
          quantity: 1
        });
      }

      const qtyButton = target?.closest?.('[data-qty]');
      if (qtyButton) {
        const itemEl = qtyButton.closest('[data-cart-item]');
        const sku = itemEl?.getAttribute('data-sku');
        const action = qtyButton.getAttribute('data-qty') as 'increase' | 'decrease' | 'remove' | null;
        if (!sku || !action) return;
        updateQty(sku, action);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [addToCart, closeCart, openCart, updateQty]);

  const whatsappMessage = useMemo(() => buildWhatsappMessage(items, currency), [items, currency]);
  const whatsappHref = useMemo(
    () => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`,
    [whatsappMessage]
  );

  return (
    <>
      <div className="cart-fab" data-cart-toggle>
        <span className="cart-fab-label">Carrito</span>
        <span className="cart-count" data-cart-count>{count}</span>
      </div>

      <div className={`cart-overlay ${isOpen ? 'show' : ''}`} data-cart-overlay></div>

      <aside className={`cart-drawer ${isOpen ? 'open' : ''}`} data-cart-drawer aria-label="Carrito de compras">
        <div className="cart-header">
          <h3 className="cart-title">Tu carrito</h3>
          <button className="cart-close" type="button" data-cart-close aria-label="Cerrar carrito">✕</button>
        </div>
        <div className="cart-body" data-cart-items>
          {!items.length ? (
            <p className="cart-empty">Tu carrito está vacío.</p>
          ) : (
            items.map((item) => (
              <div className="cart-item" data-cart-item data-sku={item.sku} key={item.sku}>
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p>Color: {item.color}</p>
                  <p>Talla: {item.size}</p>
                  <p className="cart-item-price">{formatCurrency(item.price, item.currency)}</p>
                </div>
                <div className="cart-item-actions">
                  <div className="cart-qty">
                    <button type="button" data-qty="decrease" aria-label="Disminuir">−</button>
                    <span>{item.quantity}</span>
                    <button type="button" data-qty="increase" aria-label="Aumentar">+</button>
                  </div>
                  <button type="button" className="cart-remove" data-qty="remove">Quitar</button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="cart-summary">
          <div className="cart-total">
            <span>Total</span>
            <strong data-cart-total>{formatCurrency(totalValue, currency)}</strong>
          </div>
          <a
            className={`btn btn-primary cart-whatsapp ${items.length ? '' : 'disabled'}`}
            data-cart-whatsapp
            target="_blank"
            rel="noopener noreferrer"
            href={whatsappHref}
            aria-disabled={!items.length}
          >
            Pedir por WhatsApp
          </a>
        </div>
      </aside>

      <style>
        {`
        .cart-fab {
          position: fixed;
          right: 1.5rem;
          bottom: 1.5rem;
          background: var(--color-rust);
          color: white;
          padding: 0.75rem 1rem;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
          cursor: pointer;
          z-index: 9999;
        }

        .cart-count {
          background: white;
          color: var(--color-rust);
          border-radius: 999px;
          padding: 0.2rem 0.5rem;
          font-weight: 700;
          font-size: 0.8rem;
        }

        .cart-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.35);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease;
          z-index: 9998;
        }

        .cart-overlay.show {
          opacity: 1;
          pointer-events: auto;
        }

        .cart-drawer {
          position: fixed;
          top: 0;
          right: 0;
          height: 100vh;
          width: min(420px, 90vw);
          background: white;
          box-shadow: -10px 0 30px rgba(0, 0, 0, 0.15);
          transform: translateX(100%);
          transition: transform 0.25s ease;
          display: flex;
          flex-direction: column;
          z-index: 9999;
        }

        .cart-drawer.open {
          transform: translateX(0);
        }

        .cart-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem;
          border-bottom: 1px solid #eee;
        }

        .cart-title {
          margin: 0;
          font-family: var(--font-product);
          color: var(--color-ink);
        }

        .cart-close {
          border: none;
          background: transparent;
          font-size: 1.2rem;
          cursor: pointer;
        }

        .cart-body {
          flex: 1;
          overflow-y: auto;
          padding: 1rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .cart-empty {
          color: var(--color-gray-500);
        }

        .cart-item {
          border: 1px solid #eee;
          border-radius: 12px;
          padding: 0.75rem 1rem;
          display: flex;
          justify-content: space-between;
          gap: 1rem;
        }

        .cart-item-info h4 {
          margin: 0 0 0.35rem;
          font-size: 1rem;
          color: var(--color-ink);
        }

        .cart-item-info p {
          margin: 0.1rem 0;
          font-size: 0.85rem;
          color: var(--color-gray-600);
        }

        .cart-item-price {
          font-weight: 700;
          color: var(--color-rust);
        }
        .btn-primary{
        background: var(--color-rust);
        color: white;
        padding: 0.8rem 1.5rem;
        border-radius: 8px;
        text-decoration: none;
        font-weight: 600;
        transition: filter 0.2s;
        cursor: pointer;
        }

        .btn-primary:hover {
          filter: brightness(1.1);
        }

        .cart-item-actions {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.5rem;
        }

        .cart-qty {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          border: 1px solid #eee;
          border-radius: 999px;
          padding: 0.15rem 0.5rem;
        }

        .cart-qty button {
          border: none;
          background: transparent;
          font-size: 1rem;
          cursor: pointer;
        }

        .cart-remove {
          border: none;
          background: transparent;
          color: var(--color-gray-500);
          cursor: pointer;
          font-size: 0.8rem;
        }

        .cart-summary {
          border-top: 1px solid #eee;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .cart-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 1rem;
        }

        .cart-whatsapp.disabled {
          pointer-events: none;
          opacity: 0.6;
        }

        @media (max-width: 480px) {
          .cart-fab-label {
            display: none;
          }
        }
      `}
      </style>
    </>
  );
}
