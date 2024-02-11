import Image from 'next/image'

export default function Home() {
  return (
    <div className='relative w-[100%] mobile:w-[460px] tablet:w-[620px] laptop:w-[860px] mx-auto p-[1rem] text-[#313638]'>
        <nav className='fixed w-[100%] pr-[2rem] mobile:w-[460px] tablet:w-[620px] laptop:w-[860px]'>
            <div className='inp-outer '>
                <div className='inp w-[100%] p-[8px] flex justify-between items-center'>

                    <h1 className='text-[1rem] font-bold pl-[0.5rem]'>  toolbox</h1>

                    <div className='flex gap-[0.5rem] text-[0.75rem] tablet:text-[1rem] font-semibold'>

                        <div className='inp-outer'>
                            <div className='inp-outer rounded-[8px] px-[0.5rem] bg-[#FF9D00]'>
                                  Tools
                            </div>
                        </div>

                        <div className='inp-outer'>
                            <div className='inp-outer rounded-[8px] px-[0.5rem] bg-[#FF9D00]'>
                                  Contribute
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </nav>

        <main className='mt-[6rem] tablet:mt-[7rem] laptop:mt-[8rem]'>
            <div className='py-[1rem] flex flex-col gap-[0.5rem] justify-center items-center'>
                <h1 className='text-[2rem] mobile:text-[2.5rem] font-bold text-center'>New age toolbox</h1>
                <h3 className='text-[1rem] mobile:text-[1.25rem] text-center'>You all need this website to make <br></br> your creation journey easier</h3>
                <div className='inp-outer mt-[1rem]'>
                            <div className='inp-outer rounded-[8px] px-[1rem] bg-[#FF9D00] text-[1rem] font-semibold'>
                                  Lets explore tools
                            </div>
                </div>
            </div>
        </main>

        <footer className='mt-[20rem]'>
            <div className='flex justify-between items-center'>
                <h1 className='text-[1rem] font-bold pl-[0.5rem]'>toolbox</h1>
                <div className='flex gap-[0.5rem]'>
                <div className='inp-outer'>
                            <div className='inp-outer rounded-[8px] px-[0.5rem] bg-[#E8E9EB] text-[0.75rem] tablet:text-[1rem] font-semibold'>
                                  Report and issue ?
                            </div>
                </div>

                <div className='inp-outer'>
                            <div className='inp-outer rounded-[8px] px-[0.5rem] bg-[#E8E9EB] text-[0.75rem] tablet:text-[1rem] font-semibold'>
                                  Contact
                            </div>
                </div>
                </div>
            </div>
        </footer>
    </div>
  )
}
