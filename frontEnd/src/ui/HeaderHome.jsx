import React from 'react'
import HeroImg from './HeroImg'

export default function HeaderHome() {
  return (
    <div className="px-10" >
      <div className="lg:max-w-[1400px] m-auto pt-24 gap-10 flex flex-col items-center lg:flex lg:flex-row lg:items-center lg:justify-between" >
        <HeroImg />
        <div className=" flex flex-col lg:gap-5 gap-2 lg:w-[50%] font-arbic pl-3 text-center lg:text-end " >
          <h1 className=" font-bold text-zinc-600 xl:text-6xl md:text-5xl text-5xl" >طورنا التسوق ليكون أسهل وأمتع علشان عيونك </h1>
          <p className='text-zinc-600 lg:pl-15 pl-0' > 
            حبك وحده استطاع إبقائي على قيد الحياة. الزواج الناجح يحتاج الوقوع في الحب مرات عديدة مع نفس الشخص. الحب حياة يجب أن يعيشها كل زوجين ويجب أن يفوز كلاهما. للحصول على الفرحة الكاملة، يجب أن تكون معي لأقتسم معك السعادة.
            حبك وحده استطاع إبقائي على قيد الحياة. الزواج الناجح يحتاج الوقوع في الحب مرات عديدة مع نفس الشخص. الحب حياة يجب أن يعيشها كل زوجين ويجب أن يفوز كلاهما. للحصول على الفرحة الكاملة، يجب أن تكون معي لأقتسم معك السعادة.
          </p>
          <button className="bg-blue-600 py-1 cursor-pointer rounded text-white text-lg px-5 self-end lg:m-0 m-auto">
            شوف كل المنتجات
          </button>
        </div>
      </div>
    </div>
  )
}
