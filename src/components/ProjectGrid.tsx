import { useState, useEffect, type MouseEvent } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import { triggerHaptic } from '../utils/haptics'



const projects = [
    { id: 1, title: 'Luminous Arc', type: 'Signature Console', image: '/assets/IMG-20251203-WA0020.jpg', size: 'large' },
    { id: 2, title: 'Gilded Silence', type: 'Master Suite', image: '/assets/IMG-20251203-WA0007.jpg', size: 'small' },
    { id: 3, title: 'Velvet & Gold', type: 'Walkthrough', video: '/assets/VID-20251203-WA0006.mp4', size: 'small' },
    { id: 4, title: 'Linear Elegance', type: 'Bespoke Storage', image: '/assets/IMG-20251203-WA0010.jpg', size: 'medium' },
    { id: 5, title: 'Illuminated Spaces', type: 'Modern Living', video: '/assets/VID-20251203-WA0009.mp4', size: 'small' },
    { id: 6, title: 'Prismatic Dreams', type: 'Modern Bedroom', image: '/assets/IMG-20251203-WA0017.jpg', size: 'medium' },
    { id: 7, title: 'Botanical Arches', type: 'Guest Suite', image: '/assets/IMG-20251203-WA0012.jpg', size: 'large' },
    { id: 8, title: 'Emerald Culinary', type: 'Gourmet Kitchen', image: '/assets/IMG-20251203-WA0013.jpg', size: 'small' },
    { id: 9, title: 'Blush Tones', type: 'Interior Styling', image: '/assets/IMG-20251203-WA0014.jpg', size: 'medium' },
    { id: 10, title: 'Crystal Reflection', type: 'Accent Wall', image: '/assets/IMG-20251203-WA0015.jpg', size: 'small' },
    { id: 11, title: 'Chic Vanity', type: 'Dressing Nook', image: '/assets/IMG-20251203-WA0016.jpg', size: 'medium' },
    { id: 12, title: 'Pastel Harmony', type: 'Complete Look', image: '/assets/IMG-20251203-WA0018.jpg', size: 'large' },
]

const TiltCard = ({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) => {
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 })
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 })

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"])
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"])

    // Glare effect transforms
    const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"])
    const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"])

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (isMobile) return // Disable on mobile

        const rect = e.currentTarget.getBoundingClientRect()
        const width = rect.width
        const height = rect.height
        const mouseXFromCenter = e.clientX - rect.left - width / 2
        const mouseYFromCenter = e.clientY - rect.top - height / 2

        x.set(mouseXFromCenter / width)
        y.set(mouseYFromCenter / height)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.div
            className={`relative preserve-3d cursor-pointer ${className}`}
            style={{
                perspective: 1000
            }}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileHover={!isMobile ? { scale: 1.02, zIndex: 10 } : undefined}
            whileTap={isMobile ? { scale: 0.98 } : undefined}
        >
            <motion.div
                style={{
                    rotateX: isMobile ? 0 : rotateX,
                    rotateY: isMobile ? 0 : rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="w-full h-full relative"
            >
                {children}

                {/* Glare Effect - Hidden on Mobile */}
                {!isMobile && (
                    <motion.div
                        className="absolute inset-0 pointer-events-none z-20 mix-blend-overlay"
                        style={{
                            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.4) 0%, transparent 60%)`,
                            opacity: useTransform(mouseX, [-0.5, 0, 0.5], [0.6, 0, 0.6])
                        }}
                    />
                )}
            </motion.div>
        </motion.div>
    )
}

const ProjectGrid = () => {
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
    const [showAll, setShowAll] = useState(false)

    const visibleProjects = showAll ? projects : projects.slice(0, 6)

    return (
        <section id="projects" className="py-0 bg-charcoal relative">
            {/* Header Section - Full Width, Stark */}
            <div className="border-b border-white/10 py-24 md:py-32">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-10">
                        <div className="max-w-2xl">
                            <span className="text-brand-green font-bold tracking-[0.3em] uppercase text-xs mb-6 block">Selected Works</span>
                            <h2 className="text-5xl md:text-7xl font-[Oswald] font-bold italic uppercase leading-[0.9] text-white">
                                Crafted <br /> <span className="text-white/30">Precision.</span>
                            </h2>
                        </div>
                        <button
                            onClick={() => {
                                triggerHaptic('medium');
                                setShowAll(!showAll);
                            }}
                            className="btn-outline flex items-center gap-3 group"
                        >
                            {showAll ? 'View Less' : 'View All Projects'}
                            <ArrowUpRight size={20} className={`transform transition-transform duration-300 ${showAll ? 'rotate-90' : 'group-hover:translate-x-1 group-hover:-translate-y-1'}`} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Grid - No Gaps on Mobile, Small Gap on Desktop for 'Technical' feel */}
            <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[400px] md:auto-rows-[600px] gap-2 p-2 md:gap-4 md:p-4">
                <AnimatePresence mode='wait'>
                    {visibleProjects.map((project, index) => (
                        <TiltCard
                            key={project.id}
                            onClick={() => {
                                triggerHaptic('medium');
                                setSelectedProject(project);
                            }}
                            className={`group bg-grey-surface overflow-hidden border border-white/5
                            ${project.size === 'large' ? 'md:col-span-8' :
                                    project.size === 'medium' ? 'md:col-span-6' :
                                        'md:col-span-4'}`
                            }
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className="w-full h-full relative"
                            >
                                {/* Image/Video Container */}
                                <div className="w-full h-full absolute inset-0">
                                    {project.video ? (
                                        <motion.video
                                            layoutId={`project-media-${project.id}`}
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                                        >
                                            <source src={project.video} type="video/mp4" />
                                        </motion.video>
                                    ) : (
                                        <motion.img
                                            layoutId={`project-media-${project.id}`}
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                                        />
                                    )}
                                </div>

                                {/* Overlay Content - Technical Labels */}
                                <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none transform-style-3d translate-z-10">
                                    <div className="flex justify-between items-start opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                                        <span className="bg-brand-green text-charcoal text-[10px] font-bold uppercase tracking-widest px-2 py-1 translate-z-20">
                                            {index + 1 < 10 ? `0${index + 1}` : index + 1}
                                        </span>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedProject(project);
                                            }}
                                            className="w-12 h-12 bg-charcoal/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-brand-green hover:text-charcoal hover:border-brand-green transition-all duration-300 pointer-events-auto transform translate-z-20"
                                        >
                                            <ArrowUpRight size={20} />
                                        </button>
                                    </div>

                                    <div className="transform translate-y-0 md:translate-y-8 md:group-hover:translate-y-0 transition-transform duration-500 translate-z-20">
                                        <span className="text-brand-green font-mono text-xs uppercase tracking-widest block mb-2">{project.type}</span>
                                        <h3 className="text-3xl font-[Oswald] font-bold uppercase italic text-white leading-none">
                                            {project.title}
                                        </h3>
                                    </div>
                                </div>
                            </motion.div>
                        </TiltCard>
                    ))}
                </AnimatePresence>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/98 flex items-center justify-center p-0 md:p-10"
                        onClick={() => setSelectedProject(null)}
                    >
                        {/* Close Button */}
                        <button
                            className="absolute top-8 right-8 text-white/50 hover:text-brand-green transition-colors z-[110]"
                            onClick={(e) => {
                                e.stopPropagation();
                                triggerHaptic('light');
                                setSelectedProject(null);
                            }}
                        >
                            <X size={40} strokeWidth={1} />
                        </button>

                        {/* Navigation Arrows */}
                        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-12 z-[105] pointer-events-none">
                            <button
                                className="w-16 h-16 bg-white/5 hover:bg-brand-green/20 border border-white/10 flex items-center justify-center text-white/50 hover:text-brand-green transition-all pointer-events-auto group"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const currentIndex = projects.findIndex(p => p.id === selectedProject.id);
                                    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
                                    triggerHaptic('light');
                                    setSelectedProject(projects[prevIndex]);
                                }}
                            >
                                <ArrowUpRight size={24} className="-rotate-135 group-active:scale-90 transition-transform" />
                            </button>
                            <button
                                className="w-16 h-16 bg-white/5 hover:bg-brand-green/20 border border-white/10 flex items-center justify-center text-white/50 hover:text-brand-green transition-all pointer-events-auto group"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const currentIndex = projects.findIndex(p => p.id === selectedProject.id);
                                    const nextIndex = (currentIndex + 1) % projects.length;
                                    triggerHaptic('light');
                                    setSelectedProject(projects[nextIndex]);
                                }}
                            >
                                <ArrowUpRight size={24} className="rotate-45 group-active:scale-90 transition-transform" />
                            </button>
                        </div>

                        {/* Image Counter */}
                        <div className="absolute top-10 left-10 text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">
                            Project <span className="text-brand-green">{projects.findIndex(p => p.id === selectedProject.id) + 1}</span> / {projects.length}
                        </div>

                        <motion.div
                            key={selectedProject.id}
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: -20 }}
                            transition={{ type: "spring", damping: 30, stiffness: 400 }}
                            className="relative max-w-7xl max-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="w-full h-full relative aspect-[16/9] md:aspect-auto flex items-center justify-center">
                                {selectedProject.video ? (
                                    <motion.video
                                        layoutId={`project-media-${selectedProject.id}`}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        controls
                                        className="w-full h-full object-contain max-h-[80vh] shadow-2xl"
                                    >
                                        <source src={selectedProject.video} type="video/mp4" />
                                    </motion.video>
                                ) : (
                                    <motion.img
                                        layoutId={`project-media-${selectedProject.id}`}
                                        src={selectedProject.image}
                                        alt={selectedProject.title}
                                        className="w-full h-full object-contain max-h-[80vh] shadow-2xl"
                                    />
                                )}
                            </div>

                            <div className="mt-8 text-center px-6">
                                <span className="text-brand-green font-mono text-[10px] uppercase tracking-[0.5em] block mb-2">{selectedProject.type}</span>
                                <h3 className="text-4xl md:text-6xl font-[Oswald] font-bold uppercase italic text-white tracking-tight">{selectedProject.title}</h3>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

export default ProjectGrid
