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

function App() {
    const [widget, setWidgets] = useState<JSX.Element[]>([]);

    useEffect(() => {
        const slideData = ContentService.generateWidgets();
        const newWidgets: JSX.Element[] = []

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
    }, [])

    return (
        <>
            <Layout>
          <Container>
                <VerticalCarousel slides={widget}>
                </VerticalCarousel>
        </Container>
            
            </Layout>
        </>
    )
}

export default App
