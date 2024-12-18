import Image from "next/image"
import { motion } from "framer-motion"

const skills = [
    { name: "Bootstrap", image: "/images/bootstrap.png" },
    { name: "PHP", image: "/images/php-logo-4694fbe1.webp" },
    { name: "Twig", image: "/images/twig-logo.png" },
    { name: "SQL", image: "/images/sql-logo-6f2e527e.webp" },
    { name: "HTML", image: "/images/html-logo-0f5d6bc7.webp" },
    { name: "CSS", image: "/images/css-logo-7cd08696.webp" },
    { name: "JavaScript", image: "/images/javascript-logo-58842eab.webp" },
    { name: "Tailwind CSS", image: "/images/tailwind-logo-23f154a0.webp" },
]

const Skills = () => {
    return (
        <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-8">Vaardigheden</h2>
            <div className="flex flex-wrap justify-center gap-8">
                {skills.map((skill, index) => (
                    <motion.div
                        key={skill.name}
                        className="flex justify-center items-center bg-white hover:bg-slate-100 rounded-lg p-4 shadow transition-colors"
                        style={{ width: "200px", height: "150px" }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <Image
                            src={skill.image}
                            alt={skill.name}
                            width={100}
                            height={100}
                            className="object-contain"
                        />
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

export default Skills