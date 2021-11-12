export const arrowBottomIcon = (
  <svg width="12" height="12" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path className="inheritFill" d="M6 8L0.803847 0.5L11.1962 0.500001L6 8Z" fill="#848DA3" />
  </svg>
);

export const arrowRightIcon = (size?: number, fill?: string, className?: string) => (
  <svg width={size || 12} height={size || 12} viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path className={className} d="M8 5.7002L0.500001 10.8963L0.500001 0.504043L8 5.7002Z" fill={fill || 'var(--_disabledTextColor)'} />
  </svg>
);

export const arrowSignIn = (
  <svg width="17" height="11" viewBox="0 0 17 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path className="inheritFill" d="M12.3375 0.837891L11.5803 1.59516L14.95 4.96487H0V6.03581H14.95L11.5803 9.40549L12.3375 10.1628L17 5.5003L12.3375 0.837891Z" fill="white" />
  </svg>
);

export const returnArrow = (
  <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      className="inheritFill"
      d="M0.255767 7.62248L6.03392 13.4008C6.19886 13.5657 6.4187 13.6562 6.6531 13.6562C6.88777 13.6562 7.10747 13.5656 7.27241 13.4008L7.79702 12.876C7.96184 12.7113 8.05263 12.4914 8.05263 12.2568C8.05263 12.0224 7.96184 11.7951 7.79702 11.6304L4.42613 8.25207L15.1356 8.25207C15.6185 8.25207 16 7.87405 16 7.39107L16 6.64922C16 6.16623 15.6185 5.7501 15.1356 5.7501L4.38789 5.7501L7.7969 2.35293C7.96171 2.18799 8.0525 1.974 8.0525 1.73947C8.0525 1.50519 7.96171 1.28809 7.7969 1.12328L7.27228 0.600227C7.10734 0.435285 6.88764 0.345399 6.65297 0.345399C6.41857 0.345399 6.19873 0.436455 6.03379 0.601397L0.255638 6.37956C0.090306 6.54502 -0.000619286 6.7659 3.10994e-05 7.00069C-0.000489627 7.23627 0.0903059 7.45727 0.255767 7.62248Z"
      fill="#3A5277"
    />
  </svg>
);

export const prevArrow = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      className="inheritFill"
      d="M0.292875 8.70694L3.83594 12.25C4.03122 12.4453 4.28712 12.5429 4.54306 12.5429C4.799 12.5429 5.05491 12.4453 5.25019 12.25C5.64069 11.8595 5.64069 11.2263 5.25019 10.8358L3.41422 8.99984H15C15.5523 8.99984 16 8.55212 16 7.99984C16 7.44756 15.5523 6.99984 15 6.99984H3.41422L5.25019 5.1639C5.64069 4.77337 5.64069 4.14022 5.25019 3.74969C4.85963 3.35915 4.2265 3.35915 3.83594 3.74969L0.292875 7.29275C-0.0976238 7.68325 -0.0976238 8.31644 0.292875 8.70694Z"
      fill="#3A5277"
    />
  </svg>
);

export const nextArrow = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      className="inheritFill"
      d="M15.7071 8.70694L12.1641 12.25C11.9688 12.4453 11.7129 12.5429 11.4569 12.5429C11.201 12.5429 10.9451 12.4453 10.7498 12.25C10.3593 11.8595 10.3593 11.2263 10.7498 10.8358L12.5858 8.99984H1C0.447719 8.99984 0 8.55212 0 7.99984C0 7.44756 0.447719 6.99984 1 6.99984H12.5858L10.7498 5.1639C10.3593 4.77337 10.3593 4.14022 10.7498 3.74969C11.1404 3.35915 11.7735 3.35915 12.1641 3.74969L15.7071 7.29275C16.0976 7.68325 16.0976 8.31644 15.7071 8.70694Z"
      fill="white"
    />
  </svg>
);

export const gridAscArrow = (
  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 0L9.33013 6L0.669873 6L5 0Z" fill="#848DA3" />
  </svg>
);

export const gridDescArrow = (
  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 6L0.669873 1.38009e-07L9.33013 8.95112e-07L5 6Z" fill="#848DA3" />
  </svg>
);
