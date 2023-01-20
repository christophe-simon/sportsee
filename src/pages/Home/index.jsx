import React, { useState, useEffect } from 'react';
import DailyActivityChart from '../../components/DailyActivityChart';
import KeyDataChart from '../../components/KeyDataChart';
import {useFetchUser, useFetchDailyActivity, useFetchAverageSessionDuration, useFetchPerformance} from '../../data/api.js'
import '../../styles/Home.css'

function Home() {
  const user = useFetchUser();
  const dailyActivity = useFetchDailyActivity();
  const averageSessionDuration = useFetchAverageSessionDuration();
  const performance = useFetchPerformance();

  const userFirstName = user?.userInfos?.firstName || '';
  const completionOfDailyObjective = user?.todayScore || '';

  const typesOfActivities = performance?.kind || {};
  const [dailyActivityChartData, setDailyActivityChartData] = useState([]);
  const keyDataChartData = user?.keyData || {};

  useEffect(() => {
    console.log("user");
    console.log(user);
    console.log("dailyActivity");
    console.log(dailyActivity);
    console.log("averageSessionDuration");
    console.log(averageSessionDuration);
    console.log("performance");
    console.log(performance);
    console.log("typesOfActivities");
    console.log(typesOfActivities);
    console.log("dailyActivityChartData");
    console.log(dailyActivityChartData);
    console.log("keyDataChartData");
    console.log(keyDataChartData);
    if(dailyActivity){
      setDailyActivityChartData(dailyActivity.sessions);
    }
  }, [dailyActivity]);

  return (
    <div className='home_page'>
      <div className='welcome'>
        <h1 className='welcome__hello'>Bonjour <span className='first_name'>{userFirstName}</span></h1>
        <p className='welcome__message'>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
      </div>
      <div className='charts'>
        <div className="charts__left">
          <div className="daily_activity">
            {dailyActivityChartData.length > 0 &&<DailyActivityChart dailyActivityChartData={dailyActivityChartData} />}
          </div>
          <div className="others">
            <div className="others__1">
              {completionOfDailyObjective && <p>{completionOfDailyObjective}</p>}
            </div>
            <div className="others__2">qsdf</div>
            <div className="others__3">qds</div>
          </div>
        </div>
        <div className="charts__right">
          {Object.entries(keyDataChartData).map(([keyName, keyValue]) => (
            <KeyDataChart key={keyName} keyName={keyName} keyValue={keyValue} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
