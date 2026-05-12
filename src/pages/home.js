import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Flame, GraduationCap, Sparkles, Trophy, UsersRound } from 'lucide-react'

import Status from '../components/home/Status'
import Posts from '../components/home/Posts'
import RightSideBar from '../components/home/RightSideBar'

import { useSelector } from 'react-redux'
import LoadIcon from '../images/loading.gif'


let scroll = 0;

const Home = () => {
    const { homePosts, auth, suggestions } = useSelector(state => state)

    useEffect(() => {
        const handleScroll = () => {
            if(window.location.pathname === '/'){
                scroll = window.pageYOffset
            }
        }
        window.addEventListener('scroll', handleScroll, { passive: true })

        setTimeout(() => {
            window.scrollTo({top: scroll, behavior: 'smooth'})
        }, 100)

        return () => window.removeEventListener('scroll', handleScroll)
    },[])

    return (
        <main className="learning-shell">
            <section className="learning-hero">
                <div>
                    <p className="learning-kicker">EduSocial Learning Network</p>
                    <h1>{auth.user?.fullname ? `Welcome back, ${auth.user.fullname}` : 'Build your learning streak'}</h1>
                    <p className="learning-copy">Follow mentors, join study clusters, and keep progress moving through the community feed.</p>
                </div>
                <motion.div
                    className="level-card"
                    initial={{ opacity: 0, y: 20, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.45 }}
                >
                    <Sparkles size={22} />
                    <span>Level Up Ready</span>
                    <strong>{homePosts.posts.length + suggestions.users.length}</strong>
                </motion.div>
            </section>

            <section className="learning-bento" aria-label="Learning stats">
                <motion.div className="bento-tile bento-wide" whileHover={{ y: -3 }}>
                    <Flame />
                    <span>Feed Signals</span>
                    <strong>{homePosts.result || homePosts.posts.length}</strong>
                </motion.div>
                <motion.div className="bento-tile" whileHover={{ y: -3 }}>
                    <UsersRound />
                    <span>Study Circle</span>
                    <strong>{auth.user?.following?.length || 0}</strong>
                </motion.div>
                <motion.div className="bento-tile" whileHover={{ y: -3 }}>
                    <Trophy />
                    <span>Saved Wins</span>
                    <strong>{auth.user?.saved?.length || 0}</strong>
                </motion.div>
                <motion.div className="bento-tile" whileHover={{ y: -3 }}>
                    <GraduationCap />
                    <span>Mentors</span>
                    <strong>{suggestions.users.length}</strong>
                </motion.div>
            </section>

            <div className="home learning-grid row mx-0">
                <div className="col-md-8 learning-feed">
                    <Status />

                    {
                        homePosts.loading 
                        ? <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
                        : (homePosts.result === 0 && homePosts.posts.length === 0)
                            ? <h2 className="text-center">No Post</h2>
                            : <Posts />
                    }
                    
                </div>
                
                <div className="col-md-4 learning-side">
                    <RightSideBar />
                </div>
            </div>
        </main>
    )
}

export default Home
