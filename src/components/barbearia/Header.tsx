import React from 'react';
import { Calendar } from 'lucide-react';

const Header = () => {
  return (
    <nav className="fixed top-0 left-0 w-full h-[72px] z-50 px-4 md:px-12 py-[14px] bg-[rgba(201,117,64,0.04)] backdrop-blur-sm border-b border-[rgba(201,117,64,0.15)] flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span className="font-display-toledo text-[18px] font-semibold text-toledo-creme leading-none">
          BL
        </span>
        <span className="font-display-toledo text-[14px] text-toledo-creme leading-none opacity-40">
          |
        </span>
        <span className="font-body-toledo text-[14px] text-toledo-creme leading-none">
          1ª Edição
        </span>
      </div>

      <div className="hidden md:flex items-center gap-3 px-[14px] py-2 rounded-full bg-[rgba(245,237,223,0.02)] border border-[rgba(245,237,223,0.15)]">
        <Calendar className="w-4 h-4 text-toledo-creme" />
        <span className="font-body-toledo text-[14px] text-toledo-creme">
          7 e 8 de Junho
        </span>
        <span className="font-body-toledo text-[14px] text-toledo-creme opacity-40">
          |
        </span>
        <span className="font-body-toledo text-[14px] text-toledo-creme">
          09h00 às 18h
        </span>
      </div>
    </nav>
  );
};

export default Header;