import Layout from './Layout'
import './App.css'
import Widget from './components/Widget'
import VerticalCarousel from './components/VerticalCarousel'
import { useEffect, useState } from 'react'
import { ContentService } from './services/ContentService'
import { EndOfDayWidgetData } from './types/EndOfDayWidgetData'
import { SuggestionWidgetData } from './types/SuggestionWidgetData'
import { EndWidgetData } from './types/EndWidgetData'
import Container from './components/Container'
import { TextField } from '@mui/material'

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
    }, [])
    return (
        <>
            { onInitialLoad ? <InitializeApp setName={setName} /> : <NonInitializedApp /> }
        </>
    );
}

interface InitializeAppProps {
    setName: (name: string) => void;
}
const InitializeApp = (props: InitializeAppProps) => {
    // animate this 
    return (
      <>
        <div className="inital h-full w-full">
        { <>
          <div>Hi there!</div>
          <div>What's your name?</div>
          <div className="mt-20">
            <TextField
            sx={{ input: { color: 'white', textAlign: 'center' } }}
                id="standard-basic"
                placeholder="someone special <3"
                variant="standard"
                onChange={(e) => {
                    props.setName(e.target.value);
                }} />
            </div>
            <div>
                <button className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => {
                   
                }}>Submit</button>
            </div>
        </>}
        </div>
      </>
    );
}

const NonInitializedApp = () => {
    const [widget, setWidgets] = useState<JSX.Element[]>([]);

    useEffect(() => {
        const slideData = ContentService.generateWidgets();
        const newWidgets: JSX.Element[] = []

        for (let i = 0; i < 4; i++) {
            newWidgets.push(
                <Widget>
                    Slide {i} 
                </Widget>
            );
        }

        for (const slide of slideData) {
            if (slide instanceof EndOfDayWidgetData) {
                newWidgets.push(
                    <Widget>
                        End of day Widget
                    </Widget>
                );
            }
            else if (slide instanceof SuggestionWidgetData) {
                newWidgets.push(
                    <Widget>
                        Suggestion: {slide.suggestion}
                    </Widget>
                );
            }

            else if (slide instanceof EndWidgetData) {
                newWidgets.push(
                    <Widget>
                        There are no more wigets :(
                    </Widget>
                );
            } else {
                console.error("Unknown slide type", slide)
            }
        }

        setWidgets(newWidgets);
    }, []);
    return (
         /// start with the logic that collects the voice recording then transition to the widgets
        <>
          <Container>
              <VerticalCarousel slides={widget}>
              </VerticalCarousel>
          </Container>  
        </>
    );
}