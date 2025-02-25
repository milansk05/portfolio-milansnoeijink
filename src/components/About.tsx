"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const About = () => {
    return (
        <motion.section
            id="overmij"
            className="mb-20 p-10 bg-card rounded-lg shadow text-card-foreground flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
        >
            {/* Container voor afbeelding en tekst, gecentreerd */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-4xl">
                {/* Profielfoto */}
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-accent shadow-lg">
                    <Image
                        src="/images/blank-profile-picture-973460_960_720.webp" // Vervang met je eigen afbeelding
                        alt="Milan Snoeijink"
                        width={160}
                        height={160}
                        className="object-cover"
                    />
                </div>

                {/* Tekst */}
                <div className="max-w-2xl text-left">
                    <h2 className="text-3xl font-bold mb-4 text-accent-foreground">Over mij</h2>
                    <p className="text-accent-foreground">
                        Hey! Ik ben Milan Snoeijink, een gedreven derdejaars student Software Development aan de Bit Academy in Groningen. Mijn passie ligt bij het ontwikkelen van efficiënte, creatieve oplossingen voor complexe problemen.
                        <br /><br />
                        Ik heb ervaring met diverse programmeertalen en frameworks en werk graag aan innovatieve projecten. Nieuwsgierig? Laten we connecten!
                    </p>
                </div>
            </div>

            {/* Statistieken sectie - blijft netjes onder de tekst */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                <div className="p-4 bg-muted rounded-lg shadow-md">
                    <h3 className="text-2xl font-bold text-accent-foreground">3+ jaar</h3>
                    <p className="text-sm text-muted-foreground">Ervaring in softwareontwikkeling</p>
                </div>
                <div className="p-4 bg-muted rounded-lg shadow-md">
                    <h3 className="text-2xl font-bold text-accent-foreground">10+ projecten</h3>
                    <p className="text-sm text-muted-foreground">(Succesvol) afgerond</p>
                </div>
                <div className="p-4 bg-muted rounded-lg shadow-md">
                    <h3 className="text-2xl font-bold text-accent-foreground">Frontend & Backend</h3>
                    <p className="text-sm text-muted-foreground">Full-stack ervaring</p>
                </div>
            </div>
        </motion.section>
    );
};

export default About;