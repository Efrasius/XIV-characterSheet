import React from 'react';

export default function JobList(props) {
    const {jobList} = props;
    const {iconPath} = props;
    const tank = [];
    const heal = [];
    const physicDps = [];
    const rangeDps = [];
    const magicDps = [];
    const craft = [];
    const farm = [];

    if (!jobList.length || !iconPath)
    return(null);


    function parse() {
        console.log(jobList);
        jobList.forEach(job => {
            let jobName = job.Name.split(" / ")[1];
            let imgPath = iconPath + jobName + '.png'
            let test = require.context(imgPath, true);

            if (jobName === "paladin" || jobName === "warrior" || jobName === "dark knight" || jobName === "gunbreaker") {
                tank.push({"jobName": jobName,"imgPath": test, "level": job.Level});
            }
            else if (jobName === "white mage" || jobName === "scholar" || jobName === "astrologian" || jobName === "sage") {
                heal.push({"jobName": jobName,"imgPath": imgPath, "level": job.Level});
            }
            else if (jobName === "monk" || jobName === "dragoon" || jobName === "ninja" || jobName === "samurai" || jobName === "reaper") {
                physicDps.push({"jobName": jobName,"imgPath": imgPath, "level": job.Level});
            }
            else if (jobName === "bard" || jobName === "machinist" || jobName === "dancer") {
                rangeDps.push({"jobName": jobName,"imgPath": imgPath, "level": job.Level});
            }
            else if (jobName === "black mage" || jobName === "summoner" || jobName === "red mage" || jobName === "blue mage") {
                magicDps.push({"jobName": jobName,"imgPath": imgPath, "level": job.Level});
            }
            else if (jobName === "carpenter" || jobName === "blacksmith" || jobName === "armorer" || jobName === "goldsmith" || jobName === "leatherworker" || jobName === "weaver" || jobName === "alchemist" || jobName === "culinarian") {
                craft.push({"jobName": jobName,"imgPath": imgPath, "level": job.Level});
            }
            else
            farm.push({"jobName": jobName,"imgPath": imgPath, "level": job.Level});
        })
    }
    parse();

    console.log(tank, heal, physicDps, rangeDps, magicDps, craft, farm);

    return(
        <div className="jobWrapper">
            {tank.map((val, key) => {
                return (<div className="job">
                            <img src={val.imgPath} />
                            <p>{val.level}</p>
                        </div>)
            })}
        </div>
    );
}