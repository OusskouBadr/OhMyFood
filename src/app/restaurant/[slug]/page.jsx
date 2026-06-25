import { Shrikhand, Roboto} from 'next/font/google'
import { notFound } from 'next/navigation'
import styles from './page.module.css'
import restauData from '@/data/restaurants.json'
import Image from 'next/image'
import MenuItem from '@/components/MenuItem/MenuItem'

const shrikhand = Shrikhand({
  weight: '400', // Shrikhand n'existe qu'en 400
  subsets: ['latin'],
  variable: '--font-shrikhand',  // pour l'utiliser en variable CSS
})

const roboto = Roboto({
    weight: '300',
    subsets: ['latin'],
    variable: '--font-roboto',
})

export default async function RestaurantDetail({ params }) {
    const { slug } = await params
    // Next.js passe auto le slug dans le params
    const restau = restauData.restaurants.find((restau) => restau.slug === slug)
    
    // si le projet n'existe pas , affiche page 404
    if (!restau) {
        notFound()
    }
    
    return (
        <div className={styles.restauPage}>
            <div className={styles.imageWrapper}>
                <Image
                    className={styles.image}
                    src={restau.image}
                    alt={restau.slug}
                    fill
                    sizes="100vw"
                    priority
                    style={{ objectFit: "cover"}}
                />
            </div>
            <div className={styles.contentRestau}>
                <h3 className={styles.restauTitle}>{restau.name} </h3>
                <div className={styles.listeMenuRestau}>
                    <h4 className={styles.stepTitle}>
                        Entrées
                    </h4>
                    {restau.menu.entrées.map((entrée, index) => <MenuItem key={index} item={{nom: entrée.nom,description: entrée.description, prix:entrée.prix}} index={index}
                    />)}
                    <h4 className={styles.stepTitle}>
                        Plats
                    </h4 >
                    {restau.menu.plats.map((plat, index) => <MenuItem key={index} item={{nom: plat.nom,description: plat.description, prix:plat.prix}} index={index}
                    />)}
                    <h4 className={styles.stepTitle}>
                        Desserts
                    </h4>
                    {restau.menu.desserts.map((dessert, index) => <MenuItem key={index} item={{nom: dessert.nom,description: dessert.description, prix:dessert.prix}} index={index}
                    />)}
                </div>
            </div>
        </div>

    )
}