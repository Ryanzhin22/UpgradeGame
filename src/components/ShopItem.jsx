import React from 'react';

function ShopItem({ name, ownedCount, description, costText, isPurchased, isDisabled, onClick, isUpgraded }) {
  const classNames = [
    'shop-item', 
    isPurchased ? 'purchased' : '',
    isDisabled ? 'disabled' : '',
    isUpgraded ? 'upgraded' : '',
  ].join(' ').trim(); // Junta tudo com espaços

  return (
    <div className={classNames} onClick={!isPurchased && !isDisabled ? onClick : null}>
      <div className="item-header">
        <strong>{name}</strong>
        {ownedCount > 0 && <span className="item-owned-count">{ownedCount}</span>}
      </div>
      <p style={{ margin: '5px 0', fontSize: '0.8em' }}>{description}</p>
      <div className="item-cost">{costText}</div>
    </div>
  );
}

export default ShopItem;