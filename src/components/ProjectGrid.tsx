import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

const ProjectCard = ({ project, index, onClick, className }: { project: typeof projects[0], index: number, onClick: () => void, className?: string }) => {
    return (
        <motion.div
            className={`relative overflow-hidden cursor-pointer ${className}`}
            onClick={onClick}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
        >
            {/* Image Container - Static */}
            <div className="absolute inset-0 w-full h-full">
                {project.video ? (
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className="w-full h-full object-cover"
                    >
                        <source src={project.video} type="video/mp4" />
                    </video>
                ) : (
                    <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                    />
                )}
            </div>

            {/* Dark Gradient Overlay - Always present for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-transparent to-transparent opacity-80" />

            {/* Content Overlay - Always Visible */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                {/* Top Section: Number & Button */}
                <div className="flex justify-between items-start">
                    <span className="bg-brand-green/90 backdrop-blur-md text-charcoal text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm">
                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </span>

                    <div className="w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center text-white shadow-lg">
                        <ArrowUpRight size={20} />
                    </div>
                </div>

                {/* Bottom Section: Text - Always Visible */}
                <div>
                    <span className="text-brand-green font-mono text-xs uppercase tracking-widest block mb-1">
                        {project.type}
                    </span>
                    <h3 className="text-3xl font-[Oswald] font-bold uppercase italic text-white leading-none drop-shadow-lg">
                        {project.title}
                    </h3>
                    <div className="h-[2px] w-16 bg-brand-green mt-4" />
                </div>
            </div>
        </motion.div>
    )
}

const ProjectGrid = () => {
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
    const [showAll, setShowAll] = useState(false)

    // Keyboard navigation for lightbox
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!selectedProject) return;

            if (e.key === 'Escape') {
                setSelectedProject(null);
            } else if (e.key === 'ArrowRight') {
                const currentIndex = projects.findIndex(p => p.id === selectedProject.id);
                const nextIndex = (currentIndex + 1) % projects.length;
                setSelectedProject(projects[nextIndex]);
                triggerHaptic('light');
            } else if (e.key === 'ArrowLeft') {
                const currentIndex = projects.findIndex(p => p.id === selectedProject.id);
                const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
                setSelectedProject(projects[prevIndex]);
                triggerHaptic('light');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedProject]);

    const visibleProjects = showAll ? projects : projects.slice(0, 6)

    return (
        <section id="projects" className="py-0 bg-charcoal relative noise-bg">
            {/* Header Section - Full Width, Stark */}
            <div className="border-b border-white/10 py-14 md:py-20">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-10">
                        <div className="max-w-2xl">
                            <span className="text-brand-green font-bold tracking-[0.3em] uppercase text-xs mb-6 block flex items-center gap-3 font-playfair">
                                <span className="w-8 h-[2px] bg-brand-green" />
                                Selected Works
                            </span>
                            <h2 className="text-5xl md:text-7xl font-oswald font-bold italic uppercase leading-[0.9] text-white">
                                Crafted <br /> <span className="text-white/30 font-playfair lowercase italic font-normal tracking-tight">Precision.</span>
                            </h2>
                        </div>
                        <button
                            onClick={() => {
                                triggerHaptic('medium');
                                setShowAll(!showAll);
                            }}
                            className="btn-outline flex items-center gap-3"
                        >
                            {showAll ? 'View Less' : 'View All Projects'}
                            <ArrowUpRight size={20} className={`transform transition-transform duration-300 ${showAll ? 'rotate-90' : ''}`} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Grid - No Gaps on Mobile, Small Gap on Desktop for 'Technical' feel */}
            <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[400px] md:auto-rows-[600px] gap-2 p-2 md:gap-4 md:p-4">
                <AnimatePresence mode='wait'>
                    {visibleProjects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                            onClick={() => {
                                triggerHaptic('medium');
                                setSelectedProject(project);
                            }}
                            className={`
                            ${project.size === 'large' ? 'md:col-span-8' :
                                    project.size === 'medium' ? 'md:col-span-6' :
                                        'md:col-span-4'}`
                            }
                            aria-label={`View details of ${project.title} - ${project.type}`}
                        />
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
                            className="absolute top-8 right-8 text-white/50 hover:text-brand-green transition-colors z-[110] focus:text-brand-green outline-none"
                            onClick={(e) => {
                                e.stopPropagation();
                                triggerHaptic('light');
                                setSelectedProject(null);
                            }}
                            aria-label="Close project details"
                        >
                            <X size={40} strokeWidth={1} />
                        </button>

                        {/* Navigation Arrows */}
                        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-12 z-[105] pointer-events-none">
                            <button
                                className="w-16 h-16 bg-white/5 hover:bg-brand-green/20 border border-white/10 flex items-center justify-center text-white/50 hover:text-brand-green transition-all pointer-events-auto focus:border-brand-green outline-none"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const currentIndex = projects.findIndex(p => p.id === selectedProject.id);
                                    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
                                    triggerHaptic('light');
                                    setSelectedProject(projects[prevIndex]);
                                }}
                                aria-label="Previous project"
                            >
                                <ArrowUpRight size={24} className="-rotate-135" />
                            </button>
                            <button
                                className="w-16 h-16 bg-white/5 hover:bg-brand-green/20 border border-white/10 flex items-center justify-center text-white/50 hover:text-brand-green transition-all pointer-events-auto focus:border-brand-green outline-none"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const currentIndex = projects.findIndex(p => p.id === selectedProject.id);
                                    const nextIndex = (currentIndex + 1) % projects.length;
                                    triggerHaptic('light');
                                    setSelectedProject(projects[nextIndex]);
                                }}
                                aria-label="Next project"
                            >
                                <ArrowUpRight size={24} className="rotate-45" />
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
                            <div className="w-full relative h-[70vh] md:h-auto md:aspect-auto flex items-center justify-center">
                                {selectedProject.video ? (
                                    <video
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        controls
                                        className="w-full h-full object-contain max-h-[90vh] shadow-2xl"
                                    >
                                        <source src={selectedProject.video} type="video/mp4" />
                                    </video>
                                ) : (
                                    <img
                                        src={selectedProject.image}
                                        alt={selectedProject.title}
                                        className="w-full h-full object-contain max-h-[90vh] shadow-2xl"
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
