import React from 'react';

const Hero = () => {
    const scrollToCatalog = () => {
        document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="min-h-[80vh] flex items-center justify-center relative overflow-hidden px-6 pt-32 pb-12 md:px-8">
            <div className="container mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

                {/* Text Content */}
                <div className="bg-transparent z-10">
                    <h1 className="mb-6 text-[3rem] md:text-[4.5rem] font-medium tracking-tight text-[var(--text-main)] leading-none">
                        Surfaces for the <br />
                        <span style={{
                            fontFamily: 'Source Serif 4',
                            fontStyle: 'italic',
                            color: 'var(--accent-primary)'
                        }}>tactile world</span>.
                    </h1>
                    <p className="text-xl text-[var(--text-muted)] mb-10 leading-relaxed max-w-[90%]">
                        Curated architectural laminates that define space through texture.
                        A collection designed for the modern interior.
                    </p>
                    <div className="flex gap-4">
                        <button
                            onClick={scrollToCatalog}
                            className="btn-primary px-10 py-4 text-base"
                        >
                            View Collection
                        </button>
                    </div>
                </div>

                {/* Hero Image - Refined Integration */}
                <div className="relative flex justify-center w-full mt-8 md:mt-0">
                    {/* Subtle background shape behind image */}
                    <div className="absolute top-[5%] right-[5%] w-[90%] h-[95%] bg-[#EAE8E2] rounded-3xl -rotate-2 -z-10"></div>

                    <img
                        src="/lumina/Designer_hand_pointing_2k_202601251623.jpeg"
                        alt="Designer Hand Pointing"
                        className="w-full h-auto rounded-2xl shadow-md -rotate-1 border border-black/5"
                    />
                </div>

            </div>

        </section>
    );
};

export default Hero;
