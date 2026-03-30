import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react'

type Category = 'All' | 'Featured' | 'Living' | 'Bedroom' | 'Kitchen'
type Size = 'feature' | 'wide' | 'standard'

interface Project {
    id: number
    title: string
    type: string
    category: Exclude<Category, 'All'>
    image?: string
    video?: string
    size: Size
    location: string
    year: string
    summary: string
    details: string[]
}

const projects: Project[] = [
    {
        id: 1,
        title: 'Nizampet Living Room',
        type: 'Living room interior',
        category: 'Featured',
        image: '/assets/IMG-20251203-WA0020.jpg',
        size: 'feature',
        location: 'Nizampet',
        year: '2025',
        summary: 'A warm living room setup with a TV wall, soft lighting, and neat storage.',
        details: ['TV unit design', 'Storage planning', 'Lighting setup'],
    },
    {
        id: 2,
        title: 'Kompally Master Bedroom',
        type: 'Bedroom interior',
        category: 'Bedroom',
        image: '/assets/IMG-20251203-WA0007.jpg',
        size: 'standard',
        location: 'Kompally',
        year: '2025',
        summary: 'A calm bedroom with simple colours, soft lighting, and a clean finished look.',
        details: ['False ceiling work', 'Bed back design', 'Finish selection'],
    },
    {
        id: 3,
        title: 'KPHB Living Room Walkthrough',
        type: 'Living room video',
        category: 'Living',
        video: '/assets/VID-20251203-WA0006.mp4',
        size: 'wide',
        location: 'KPHB',
        year: '2025',
        summary: 'A finished living room with layered lights, custom wall work, and comfortable seating.',
        details: ['Custom TV wall', 'Lighting work', 'Furniture styling'],
    },
    {
        id: 4,
        title: 'Bachupally Storage Wall',
        type: 'Custom storage unit',
        category: 'Featured',
        image: '/assets/IMG-20251203-WA0010.jpg',
        size: 'standard',
        location: 'Bachupally',
        year: '2025',
        summary: 'A custom storage wall that keeps the room organised without looking bulky.',
        details: ['Custom shutter design', 'Hidden handles', 'Open display shelves'],
    },
    {
        id: 5,
        title: 'Miyapur Entertainment Unit',
        type: 'Living room feature wall',
        category: 'Living',
        video: '/assets/VID-20251203-WA0009.mp4',
        size: 'standard',
        location: 'Miyapur',
        year: '2025',
        summary: 'A TV and display unit designed for everyday use, with lighting that makes evenings feel warm.',
        details: ['TV feature wall', 'Ambient lighting', 'Display and storage'],
    },
    {
        id: 6,
        title: 'Ameenpur Bedroom',
        type: 'Bedroom design',
        category: 'Bedroom',
        image: '/assets/IMG-20251203-WA0017.jpg',
        size: 'standard',
        location: 'Ameenpur',
        year: '2025',
        summary: 'A simple bedroom with balanced colours, matching finishes, and a relaxed feel.',
        details: ['Colour selection', 'Bedside details', 'Wall and curtain matching'],
    },
    {
        id: 7,
        title: 'Kukatpally Guest Bedroom',
        type: 'Guest room interior',
        category: 'Bedroom',
        image: '/assets/IMG-20251203-WA0012.jpg',
        size: 'wide',
        location: 'Kukatpally',
        year: '2025',
        summary: 'A guest room that feels fresh, comfortable, and easy to maintain.',
        details: ['Feature wall', 'Wardrobe planning', 'Accent styling'],
    },
    {
        id: 8,
        title: 'Pragathi Nagar Kitchen',
        type: 'Modular kitchen',
        category: 'Kitchen',
        image: '/assets/IMG-20251203-WA0013.jpg',
        size: 'standard',
        location: 'Pragathi Nagar',
        year: '2025',
        summary: 'A modular kitchen planned for daily cooking, easy cleaning, and better storage.',
        details: ['Kitchen layout', 'Finish selection', 'Accessory planning'],
    },
]

const categories: Category[] = ['All', 'Featured', 'Living', 'Bedroom', 'Kitchen']

const sizeClassMap: Record<Size, string> = {
    feature: 'md:col-span-2 xl:col-span-7',
    wide: 'md:col-span-2 xl:col-span-5',
    standard: 'xl:col-span-4',
}

const ProjectGrid = () => {
    const [activeCategory, setActiveCategory] = useState<Category>('All')
    const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null)

    const filteredProjects = useMemo(
        () => projects.filter((project) => (activeCategory === 'All' ? true : project.category === activeCategory)),
        [activeCategory]
    )

    const selectedProject = selectedProjectIndex !== null ? filteredProjects[selectedProjectIndex] : null
    const currentProjectIndex = selectedProjectIndex ?? 0

    useEffect(() => {
        setSelectedProjectIndex(null)
    }, [activeCategory])

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (selectedProjectIndex === null) {
                return
            }

            if (event.key === 'Escape') {
                setSelectedProjectIndex(null)
            }

            if (event.key === 'ArrowLeft') {
                setSelectedProjectIndex((current) => {
                    if (current === null) {
                        return current
                    }

                    return (current - 1 + filteredProjects.length) % filteredProjects.length
                })
            }

            if (event.key === 'ArrowRight') {
                setSelectedProjectIndex((current) => {
                    if (current === null) {
                        return current
                    }

                    return (current + 1) % filteredProjects.length
                })
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [filteredProjects.length, selectedProjectIndex])

    return (
        <section id="projects" className="section-padding">
            <div className="shell">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <span className="section-rule">Recent work</span>
                        <h2 className="section-heading text-balance text-ink">See some of our completed interiors.</h2>
                        <p className="section-lede mt-6">
                            From living rooms and bedrooms to kitchens and storage units, here are some homes we have worked on.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`rounded-full px-4 py-2 text-sm transition-all duration-300 ${
                                    activeCategory === category ? 'bg-ink text-paper shadow-[0_18px_34px_rgba(23,20,17,0.12)]' : 'bg-paper/75 text-ink-soft'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-12">
                    {filteredProjects.map((project, index) => (
                        <motion.button
                            key={project.id}
                            type="button"
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.55, delay: index * 0.06 }}
                            className={`story-card group text-left ${sizeClassMap[project.size]}`}
                            onClick={() => setSelectedProjectIndex(index)}
                        >
                            <div className={`relative overflow-hidden ${project.size === 'feature' ? 'aspect-[1.12/1]' : 'aspect-[4/4.5]'}`}>
                                {project.video ? (
                                    <video autoPlay muted loop playsInline className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]">
                                        <source src={project.video} type="video/mp4" />
                                    </video>
                                ) : (
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <div className="soft-chip border-white/15 bg-white/10 text-white">
                                                {project.category}
                                            </div>
                                            <h3 className="mt-4 font-display text-[2rem] leading-none text-white md:text-[2.3rem]">
                                                {project.title}
                                            </h3>
                                            <p className="mt-2 max-w-lg text-sm leading-6 text-white/78 md:text-base">
                                                {project.summary}
                                            </p>
                                        </div>
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/12 text-white backdrop-blur-sm">
                                            <ArrowUpRight className="h-5 w-5" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between gap-4 px-5 py-4 text-sm text-ink-soft">
                                <span>{project.type}</span>
                                <span>{project.location} - {project.year}</span>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[120] bg-ink/65 px-4 py-6 backdrop-blur-lg"
                        onClick={() => setSelectedProjectIndex(null)}
                    >
                        <div className="flex h-full items-center justify-center">
                            <motion.div
                                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 12, scale: 0.98 }}
                                transition={{ duration: 0.35 }}
                                className="panel-strong relative grid max-h-[92vh] w-full max-w-6xl overflow-hidden lg:grid-cols-[1.15fr_0.85fr]"
                                onClick={(event) => event.stopPropagation()}
                            >
                                <button
                                    className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-ink/65 text-white"
                                    onClick={() => setSelectedProjectIndex(null)}
                                    aria-label="Close project details"
                                >
                                    <X className="h-5 w-5" />
                                </button>

                                <div className="relative bg-ink">
                                    {selectedProject.video ? (
                                        <video autoPlay muted loop playsInline controls className="h-full min-h-[18rem] w-full object-cover">
                                            <source src={selectedProject.video} type="video/mp4" />
                                        </video>
                                    ) : (
                                        <img
                                            src={selectedProject.image}
                                            alt={selectedProject.title}
                                            className="h-full min-h-[18rem] w-full object-cover"
                                        />
                                    )}
                                </div>

                                <div className="flex flex-col overflow-y-auto px-6 py-8 md:px-8 md:py-10">
                                    <div className="flex items-center gap-2 text-caption text-accent">
                                        <span>{selectedProject.category}</span>
                                        <span>-</span>
                                        <span>{selectedProject.location}</span>
                                        <span>-</span>
                                        <span>{selectedProject.year}</span>
                                    </div>

                                    <h3 className="mt-5 font-display text-[2.6rem] leading-none text-ink md:text-[3.2rem]">
                                        {selectedProject.title}
                                    </h3>
                                    <p className="mt-3 text-lg text-ink-soft">{selectedProject.type}</p>
                                    <p className="mt-6 text-base leading-7 text-ink-soft md:text-lg">{selectedProject.summary}</p>

                                    <div className="mt-8 space-y-3">
                                        {selectedProject.details.map((detail) => (
                                            <div key={detail} className="flex items-center gap-3 rounded-full border border-ink/10 bg-paper/70 px-4 py-3 text-sm text-ink-soft">
                                                <span className="h-2 w-2 rounded-full bg-accent" />
                                                {detail}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-8 flex flex-wrap gap-3">
                                        <a href="#contact" className="btn-primary" onClick={() => setSelectedProjectIndex(null)}>
                                            Ask About Similar Work
                                        </a>
                                        <a href="/surfaces" className="btn-secondary">
                                            See Material Options
                                        </a>
                                    </div>

                                    <div className="mt-auto flex items-center justify-between gap-4 pt-8">
                                        <button
                                            type="button"
                                            className="btn-secondary"
                                            onClick={() => setSelectedProjectIndex((currentProjectIndex - 1 + filteredProjects.length) % filteredProjects.length)}
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                            Previous
                                        </button>
                                        <button
                                            type="button"
                                            className="btn-primary"
                                            onClick={() => setSelectedProjectIndex((currentProjectIndex + 1) % filteredProjects.length)}
                                        >
                                            Next
                                            <ChevronRight className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

export default ProjectGrid
