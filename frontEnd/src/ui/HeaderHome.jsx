import React from 'react'
import HeroImg from './HeroImg'

export default function HeaderHome() {
  return (
    <div className="px-10" >
      <div className="max-w-[1400px] flex items-center justify-between m-auto pt-24 gap-10" >
        <HeroImg />
        <div className=" flex flex-col gap-10 text-end w-[50%] font-arbic pl-3" >
          <h1 className="text-6xl font-bold text-zinc-600 " >طورنا التسوق ليكون أسهل وأمتع علشان عيونك </h1>
          <p className='text-zinc-600 pl-15' > 
            حبك وحده استطاع إبقائي على قيد الحياة. الزواج الناجح يحتاج الوقوع في الحب مرات عديدة مع نفس الشخص. الحب حياة يجب أن يعيشها كل زوجين ويجب أن يفوز كلاهما. للحصول على الفرحة الكاملة، يجب أن تكون معي لأقتسم معك السعادة.
            حبك وحده استطاع إبقائي على قيد الحياة. الزواج الناجح يحتاج الوقوع في الحب مرات عديدة مع نفس الشخص. الحب حياة يجب أن يعيشها كل زوجين ويجب أن يفوز كلاهما. للحصول على الفرحة الكاملة، يجب أن تكون معي لأقتسم معك السعادة.
          </p>
          <button className="bg-blue-600 py-1 cursor-pointer rounded text-white text-lg px-5 self-end">
            شوف كل المنتجات
          </button>
        </div>
      </div>
    </div>
  )
}
