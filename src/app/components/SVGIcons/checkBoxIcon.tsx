export const сheckboxWithSizeIcon = (size = 20) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 20 20">
    <rect width="20" height="20" rx="4" fill="#437FEC" />
    <path
      d="M14.7071 8.0717L9.43168 13.3467C9.04103 13.7375 8.40733 13.7375 8.01631 13.3467L5.2931 10.6233C4.9023 10.2326 4.9023 9.59884 5.2931 9.20804C5.68397 8.81717 6.31762 8.81717 6.70832 9.2079L8.7242 11.2238L13.2917 6.65633C13.6825 6.26545 14.3162 6.26575 14.7069 6.65633C15.0977 7.04712 15.0977 7.68067 14.7071 8.0717Z"
      fill="white"
    />
  </svg>
);

export const сheckboxIndeterminate = (size = 20) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 20 20">
    <rect width="20" height="20" rx="4" fill="#437FEC" />
    <rect className="interminate" x="4" y={size / 2 - 1} width={size - 8} height="2" rx="1" ry="1" fill="white" />
  </svg>
);
