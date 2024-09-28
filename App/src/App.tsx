import Layout from './Layout'
import './App.css'
import Widget from './components/Widget'
import VerticalCarousel from './components/VerticalCarousel'

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
        <VerticalCarousel slides={slides}>
        </VerticalCarousel>
      </Layout>
    </>
  )
}

export default App
