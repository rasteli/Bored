import React, { useState } from "react"
import api from "./services/api"

import Option from "./components/Option"
import Spinner from "./components/Spinner"
import Content from "./components/Content"

import arrow from "./assets/arrow.svg"

function App() {
  const activityTypes = [
    "charity",
    "busywork",
    "relaxation",
    "education",
    "cooking",
    "recreational",
    "social",
    "music",
    "diy"
  ]

  const [loading, setLoading] = useState(false)
  const [type, setType] = useState(activityTypes[0])
  const [activity, setActivity] = useState("Hello, world")

  async function handleSetActivity() {
    try {
      setLoading(true)
      const response = await api.get(`/activity?type=${type}`)
      setActivity(response.data.activity)
    } catch (e) {
      console.log(e.message)
    }

    setLoading(false)
  }

  return (
    <>
      <div className="App">
        {loading ? <Spinner /> : <h1 className="activity">{activity}</h1>}
        <div className="bottom">
          <button className="btn" onClick={handleSetActivity}>
            GET BOREDLESS
          </button>
          <select
            name="types"
            className="types"
            onChange={e => setType(e.target.value)}
          >
            {activityTypes.map(item => (
              <Option type={item} key={item} />
            ))}
          </select>
          <img src={arrow} alt="arrow" className="arrow" />
        </div>
      </div>
      <Content />
    </>
  )
}

export default App
