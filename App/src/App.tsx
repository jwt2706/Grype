import Layout from './Layout'
import './App.css'
import Widget from './components/Widget'
import VerticalCarousel from './components/VerticalCarousel'
import Container from './components/Container'

function App() {

  const slides = [
        <Widget>
          <h1>Slide 1</h1>
        </Widget>,
        <Widget>
          <h1>Slide 2</h1>
        </Widget>,
        <Widget>
          <h1>Slide 3</h1>
        </Widget>,
        <Widget>
        <h1>Slide 1</h1>
      </Widget>,
      <Widget>
        <h1>Slide 2</h1>
      </Widget>,
      <Widget>
        <h1>Slide 3</h1>
      </Widget>
      ]
  return (
    <>
      <Layout>
        <Container>
        <VerticalCarousel slides={slides}></VerticalCarousel>
        </Container>
      </Layout>
    </>
  )
}

export default App
