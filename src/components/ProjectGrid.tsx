import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import { triggerHaptic } from '../utils/haptics'

type Category = 'All' | 'Signature' | 'Living' | 'Bedroom' | 'Kitchen';

interface Project {
    id: number;
    title: string;
    type: string;
    category: Exclude<Category, 'All'>;
    image?: string;
    video?: string;
    size: 'small' | 'medium' | 'large';
}

const projects: Project[] = [
    { id: 1, title: 'Luminous Arc', type: 'Signature Console', category: 'Signature', image: '/assets/IMG-20251203-WA0020.jpg', size: 'large' },
    { id: 2, title: 'Gilded Silence', type: 'Master Suite', category: 'Bedroom', image: '/assets/IMG-20251203-WA0007.jpg', size: 'small' },
    { id: 3, title: 'Velvet & Gold', type: 'Walkthrough', category: 'Living', video: '/assets/VID-20251203-WA0006.mp4', size: 'small' },
    { id: 4, title: 'Linear Elegance', type: 'Bespoke Storage', category: 'Signature', image: '/assets/IMG-20251203-WA0010.jpg', size: 'medium' },
    { id: 5, title: 'Illuminated Spaces', type: 'Modern Living', category: 'Living', video: '/assets/VID-20251203-WA0009.mp4', size: 'small' },
    { id: 6, title: 'Prismatic Dreams', type: 'Modern Bedroom', category: 'Bedroom', image: '/assets/IMG-20251203-WA0017.jpg', size: 'medium' },
    { id: 7, title: 'Botanical Arches', type: 'Guest Suite', category: 'Bedroom', image: '/assets/IMG-20251203-WA0012.jpg', size: 'large' },
    { id: 8, title: 'Emerald Culinary', type: 'Gourmet Kitchen', category: 'Kitchen', image: '/assets/IMG-20251203-WA0013.jpg', size: 'small' },
    { id: 9, title: 'Blush Tones', type: 'Interior Styling', category: 'Living', image: '/assets/IMG-20251203-WA0014.jpg', size: 'medium' },
    { id: 10, title: 'Crystal Reflection', type: 'Accent Wall', category: 'Signature', image: '/assets/IMG-20251203-WA0015.jpg', size: 'small' },
    { id: 11, title: 'Chic Vanity', type: 'Dressing Nook', category: 'Bedroom', image: '/assets/IMG-20251203-WA0016.jpg', size: 'medium' },
    { id: 12, title: 'Pastel Harmony', type: 'Complete Look', category: 'Living', image: '/assets/IMG-20251203-WA0018.jpg', size: 'large' },
]

const categories: Category[] = ['All', 'Signature', 'Living', 'Bedroom', 'Kitchen']

const SkeletonCard = ({ className }: { className?: string }) => (
    <div className={`relative overflow-hidden bg-anthropic-stone/20 animate-pulse ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-anthropic-stone/10 to-transparent opacity-50" />
    </div>
)

interface ProjectCardProps {
    project: Project;
    index: number;
    onClick: () => void;
    className?: string;
}

const ProjectCard = ({ project, index, onClick, className }: ProjectCardProps) => {
    const [isLoading, setIsLoading] = useState(true)

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{
                opacity: { duration: 0.4 },
                layout: { duration: 0.5, type: "spring", bounce: 0.2, damping: 25, stiffness: 200 }
            }}
            className={`relative overflow-hidden cursor-pointer group rounded-lg ${className}`}
            onClick={onClick}
        >
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-20"
                    >
                        <SkeletonCard className="w-full h-full" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Media Container */}
            <div className="absolute inset-0 w-full h-full">
                {project.video ? (
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        onLoadedData={() => setIsLoading(false)}
                        className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                    >
                        <source src={project.video} type="video/mp4" />
                    </video>
                ) : project.image ? (
                    <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        onLoad={() => setIsLoading(false)}
                        className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                    />
                ) : null}
            </div>

            {/* Subtle Gradient Overlay for Text Readability - Lighter feel */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-70" />

            {/* Content Overlay */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                {/* Top Section */}
                <div className="flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-white/90 backdrop-blur text-anthropic-text text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">
                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </span>

                    <div className="w-10 h-10 rounded-full bg-white text-anthropic-text flex items-center justify-center shadow-lg transform translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-all">
                        <ArrowUpRight size={18} />
                    </div>
                </div>

                {/* Bottom Section */}
                <div>
                    <span className="text-white/80 font-sans text-xs uppercase tracking-wider block mb-1 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        {project.type}
                    </span>
                    <h3 className="text-2xl font-serif text-white leading-none drop-shadow-sm transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                        {project.title}
                    </h3>
                </div>
            </div>
        </motion.div>
    )
}

const ProjectGrid = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [showAll, setShowAll] = useState(false)
    const [activeCategory, setActiveCategory] = useState<Category>('All')

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


    return (
        <section id="projects" className="py-20 bg-anthropic-beige relative">
            {/* Header Section */}
            <div className="border-b border-anthropic-stone py-10 md:py-16 mb-8">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-10">
                        <div className="max-w-2xl">
                            <span className="text-anthropic-accent font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
                                Selected Works
                            </span>
                            <h2 className="text-5xl md:text-6xl font-serif text-anthropic-text leading-tight">
                                Crafted <span className="italic text-anthropic-secondary">Precision.</span>
                            </h2>
                        </div>

                        {/* Category Filter */}
                        <div className="flex flex-wrap gap-4 md:gap-8 pb-1">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => {
                                        triggerHaptic('light')
                                        setActiveCategory(cat)
                                        setShowAll(true)
                                    }}
                                    className={`text-xs font-medium uppercase tracking-wider transition-all relative py-2 outline-none ${activeCategory === cat ? 'text-anthropic-accent' : 'text-anthropic-secondary/60 hover:text-anthropic-text'
                                        }`}
                                >
                                    {cat}
                                    {activeCategory === cat && (
                                        <motion.div
                                            layoutId="activeCategory"
                                            className="absolute bottom-0 left-0 right-0 h-[1px] bg-anthropic-accent"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => {
                                triggerHaptic('medium');
                                setShowAll(!showAll);
                                if (showAll) setActiveCategory('All');
                            }}
                            className="btn-outline hidden md:flex items-center gap-2 border-anthropic-stone text-anthropic-text hover:bg-anthropic-text hover:text-white"
                        >
                            {showAll ? 'View Less' : 'View All Projects'}
                            <ArrowUpRight size={18} className={`transform transition-transform duration-300 ${showAll ? 'rotate-90' : ''}`} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[300px] md:auto-rows-[450px] gap-4">
                    <AnimatePresence mode='popLayout'>
                        {projects
                            .filter(p => activeCategory === 'All' ? true : p.category === activeCategory)
                            .slice(0, showAll ? projects.length : 6)
                            .map((project, index) => (
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
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-anthropic-beige/95 backdrop-blur-sm flex items-center justify-center p-0 md:p-10"
                        onClick={() => setSelectedProject(null)}
                    >
                        {/* Close Button */}
                        <button
                            className="absolute top-8 right-8 text-anthropic-text hover:text-anthropic-accent transition-colors z-[110] outline-none"
                            onClick={(e) => {
                                e.stopPropagation();
                                triggerHaptic('light');
                                setSelectedProject(null);
                            }}
                            aria-label="Close project details"
                        >
                            <X size={32} strokeWidth={1.5} />
                        </button>

                        {/* Navigation Arrows */}
                        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-12 z-[105] pointer-events-none">
                            <button
                                className="w-12 h-12 rounded-full border border-anthropic-stone bg-white/50 hover:bg-white text-anthropic-text transition-all pointer-events-auto flex items-center justify-center shadow-sm"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const currentIndex = projects.findIndex(p => p.id === selectedProject.id);
                                    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
                                    triggerHaptic('light');
                                    setSelectedProject(projects[prevIndex]);
                                }}
                            >
                                <ArrowUpRight size={20} className="-rotate-135" />
                            </button>
                            <button
                                className="w-12 h-12 rounded-full border border-anthropic-stone bg-white/50 hover:bg-white text-anthropic-text transition-all pointer-events-auto flex items-center justify-center shadow-sm"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const currentIndex = projects.findIndex(p => p.id === selectedProject.id);
                                    const nextIndex = (currentIndex + 1) % projects.length;
                                    triggerHaptic('light');
                                    setSelectedProject(projects[nextIndex]);
                                }}
                            >
                                <ArrowUpRight size={20} className="rotate-45" />
                            </button>
                        </div>

                        <motion.div
                            key={selectedProject.id}
                            initial={{ scale: 0.98, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.98, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative max-w-6xl w-full flex flex-col items-center justify-center outline-none"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="w-full relative shadow-2xl rounded-lg overflow-hidden bg-white max-h-[80vh]">
                                {selectedProject.video ? (
                                    <video
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        controls
                                        className="w-full h-full object-contain max-h-[80vh]"
                                    >
                                        <source src={selectedProject.video} type="video/mp4" />
                                    </video>
                                ) : (
                                    <img
                                        src={selectedProject.image}
                                        alt={selectedProject.title}
                                        className="w-full h-full object-contain max-h-[80vh]"
                                    />
                                )}
                            </div>

                            <div className="mt-6 text-center">
                                <span className="text-anthropic-accent font-sans text-xs uppercase tracking-widest block mb-2">{selectedProject.type}</span>
                                <h3 className="text-3xl md:text-4xl font-serif text-anthropic-text">{selectedProject.title}</h3>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

export default ProjectGrid
