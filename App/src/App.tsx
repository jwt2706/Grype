import Layout from './Layout'
import './App.css'
import VerticalCarousel from './components/VerticalCarousel'
import { useEffect, useState } from 'react'
import Container from './components/Container'
import { generateWidgets } from './utils/generateWidgets'
import { CategoryType } from './types/Categories'
import AnalyzingVoice from './components/categories/AnalyzingVoice'
import Initialization from './Initialization'
import { CONFIG } from './config'

function App() {
    return (
        <>
            <Layout>
                <AppProvider />
            </Layout>
        </>
    )
}

export default App

const AppProvider = () => {
    const [onInitialLoad, setOnInitialLoad] = useState(true);
    const [name, setName] = useState<string | null>(null);
    useEffect(() => {
        if (!localStorage.getItem('name')) {
            setOnInitialLoad(true);
        } else {
            setOnInitialLoad(false);
        }
    }, [name])

    console.log(name)
    return (
        <>
            {onInitialLoad ? <InitializeApp setName={setName} /> : <NonInitializedApp />}
        </>
    );
}

interface InitializeAppProps {
    setName: (name: string) => void;
}
const InitializeApp = (props: InitializeAppProps) => {
    return (
        <>
            <div className="inital h-full w-full">
                <>
                    <Initialization setName={props.setName} />
                </>
            </div>
        </>
    );
}

const NonInitializedApp = () => {
    const [widget, setWidgets] = useState<React.ReactNode[]>([]);
    const [configState, setConfigState] = useState<true | false | null>(true);

    useEffect(() => {
        if (!localStorage.getItem('config')) {
            const config = generateConfig();
            localStorage.setItem('config', JSON.stringify(config));
            setConfigState(false)
        } else {
            setConfigState(true);
        }
    }, [configState]);



    useEffect(() => {
        generateConfig().then(setWidgets).catch(console.error)
    }, []);

    return (
        /// start with the logic that collects the voice recording then transition to the widgets
        <>
            {configState ? <AnalyzingVoice setConfigState={setConfigState} /> :
                <Container>
                    <VerticalCarousel slides={widget}>
                    </VerticalCarousel>
                </Container>
            }
        </>
    );
}

function generateConfig(): Promise<React.ReactNode[]> {
    return new Promise((resolve, reject) => {
        fetch(`${CONFIG.BACKEND_HOST}/suggest`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                topics: [CategoryType.EXERCISE, CategoryType.SOCIAL, CategoryType.FOOD, CategoryType.WATER],
                count: 3
            })
        })
            .then(data => data.json())
            .then(suggestions => {
                const widgets = generateWidgets({ config: suggestions, numberOfWidgets: 15 })
                resolve(widgets);
            })
            .catch(reject)
    })
}

