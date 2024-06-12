import * as React from "react";

function PenIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M10.7496 5.71208L14.2851 9.24764L6.03553 17.4972H2.5V13.9616L10.7496 5.71208ZM11.9281 4.53357L13.6958 2.7658C14.0213 2.44037 14.5489 2.44037 14.8743 2.7658L17.2314 5.12283C17.5568 5.44826 17.5568 5.9759 17.2314 6.30134L15.4636 8.0691L11.9281 4.53357Z" fill="#40434E"/>
    </svg>
  );
}

export default PenIcon;