import React, { useEffect, useRef, useState } from "react";
import "./education.css";
import Nav from "../components/Nav";
import Footer from "../components/footer";
import gsap from "gsap";

const education = () => {
  const firstRef = useRef();
  const secondRef = useRef();
  const thirdRef = useRef();
  const fourthRef = useRef();
  


  const scrollHandler = (elmRef) => {
    window.scrollTo({ top: elmRef.current.offsetTop, behavior: "smooth" });
  };
  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(".hero .left h1", {
      y: -373,
      top: "200px",
      opacity: 1,
      position: "absolute",
      duration: 3,
      ease: "power3.out",
      delay: 10,
    });
  }, []);

  return (
    <>
      <header className="header12">
        <Nav />
      </header>

      <main className="maine">
        <div className="eduContainer">
          <div className="page1">
            <div className="hero">
              <div className="left">
                <h1>Carbon Footprint</h1>
                <p>A silent adversary, shaping our planet's fate</p>
              </div>

              <img
                src="https://png.pngtree.com/element_our/20200610/ourmid/pngtree-modern-industrial-factory-image_2248362.jpg"
                alt=""
              />
            </div>

            <div className="herobtm">
              <h2>Definition</h2>
              <p>
                A carbon footprint is the total amount of greenhouse gases, like
                carbon dioxide, produced directly or indirectly by an
                individual, organization, or product. It measures environmental
                impact and is crucial for addressing climate change. Reducing
                carbon footprints involves adopting sustainable practices and
                using cleaner energy sources.
              </p>
            </div>
          </div>

          <div className="page2">
            <h1>What is carbon footprint ?</h1>

            <div className="boxes">
              <div className="box1 box" onClick={() => scrollHandler(firstRef)}>
                <img
                  src="https://climate.nasa.gov/internal_resources/2715/evidence%20banner%20new.jpeg"
                  alt=""
                />

                <h2>evidence</h2>

                <p>How do we know carbon footprint is real?</p>
              </div>

              <div
                className="box2 box"
                onClick={() => scrollHandler(secondRef)}>
                <img
                  src="https://climate.nasa.gov/internal_resources/2716/power-station-374097.jpg"
                  alt=""
                />

                <h2>causes</h2>

                <p>why is carbon footprint happening?</p>
              </div>

              <div className="box3 box" onClick={() => scrollHandler(thirdRef)}>
                <img
                  src="https://climate.nasa.gov/internal_resources/2719/effectsbannernew.jpeg"
                  alt=""
                />

                <h2>effects</h2>

                <p>what are the effects of carbon footprint?</p>
              </div>

              <div
                className="box4 box"
                onClick={() => scrollHandler(fourthRef)}>
                <img
                  src="https://i.pinimg.com/originals/7b/ee/24/7bee247b258dafe0ed7d913d0c1e2b4b.jpg"
                  alt=""
                />

                <h2>solutions</h2>

                <p>what is being done to solve carbon footprint?</p>
              </div>
            </div>
          </div>

          <div className="page3">
            <div className="graph">
              <h1>GRAPH</h1>
            </div>
          </div>

          <div className="page4">
            <h1>A Comprehensive Review and Future Strategies</h1>

            <div className="info">
              <div ref={firstRef} className="evidence dets">
                <div className="left">
                  <h2>Evidence of carbon footprint</h2>
                  <p>
                    The evidence of carbon footprints around the world is
                    discernible through various key indicators and data sources.
                    Greenhouse gas emissions inventories, submitted by countries
                    to international bodies like the United Nations Framework
                    Convention on Climate Change, meticulously detail the
                    quantities of carbon dioxide, methane, and other greenhouse
                    gases emitted by different sectors. National and regional
                    policies, such as climate action plans and emissions
                    reduction goals, provide insights into governments'
                    commitment to mitigating carbon impacts. Examination of
                    energy consumption data reveals the type and quantity of
                    energy sources, with a shift towards renewables indicative
                    of a lower carbon footprint. Additionally, assessing the
                    carbon intensity of industries, monitoring per capita
                    emissions, and scrutinizing deforestation rates contribute
                    to a comprehensive understanding. The existence of carbon
                    markets and trading of carbon credits also reflects efforts
                    to offset emissions. Rankings, such as the Climate Change
                    Performance Index, further evaluate countries based on their
                    comprehensive climate action, encompassing emissions,
                    renewable energy, and climate policies. Collectively, these
                    diverse sources of evidence contribute to a nuanced and
                    global perspective on carbon footprints and climate change
                    mitigation efforts.
                  </p>
                </div>

                <div className="right"></div>
              </div>

              <div ref={secondRef} className="cause dets">
                <div className="left">
                  <h2>Causes of carbon footprint</h2>
                  <p>
                    The carbon footprint, a reflection of greenhouse gas
                    emissions, is shaped by diverse factors globally. The
                    combustion of fossil fuels for energy, prevalent in power
                    plants and transportation, remains a major contributor on a
                    worldwide scale. Deforestation, a pervasive issue globally,
                    releases stored carbon and diminishes the Earth's
                    carbon-absorbing capacity. Industrial processes, spanning
                    cement, steel, and chemical production, emit significant
                    greenhouse gases globally. Agricultural practices, from
                    livestock farming to rice cultivation, contribute methane
                    and nitrous oxide emissions, impacting regions worldwide.
                    Inadequate waste management and landfill practices release
                    methane, affecting carbon footprints globally. Energy
                    consumption in buildings, influenced by the mix of renewable
                    and non-renewable sources, plays a pivotal role globally.
                    The transportation sector, a global contributor to
                    emissions, relies heavily on fossil fuels. Consumption
                    patterns and lifestyle choices globally influence carbon
                    footprints, affecting the production, transportation, and
                    disposal of goods. Addressing these multifaceted causes
                    necessitates concerted global efforts to adopt sustainable
                    practices, transition to renewable energy, and implement
                    eco-friendly policies, underscoring the global nature of
                    climate change mitigation. Individual and collective actions
                    on a global scale are imperative for curbing the impact of
                    these factors on the worldwide climate.
                  </p>
                </div>
                <div className="right"></div>
              </div>

              <div ref={thirdRef} className="effect dets">
                <div className="left">
                  <h2>Effects of carbon footprint</h2>
                  <p>
                    The effects of carbon footprints manifest on a global scale,
                    exacerbating climate change and yielding a multitude of
                    environmental and societal challenges. Elevated
                    temperatures, altered precipitation patterns, and more
                    frequent and severe extreme weather events impact regions
                    worldwide, leading to disruptions in agriculture, water
                    supply, and ecosystems. Rising sea levels pose threats to
                    coastal communities globally, contributing to increased
                    flooding and coastal erosion. Ocean acidification, a
                    consequence of higher atmospheric carbon dioxide levels,
                    jeopardizes marine ecosystems and biodiversity. The health
                    impacts of air pollution from increased carbon emissions
                    affect populations globally, with respiratory and
                    cardiovascular diseases becoming more prevalent.
                    Furthermore, climate-induced migration and conflicts over
                    dwindling resources highlight the societal ramifications.
                    Tackling the effects of carbon footprints necessitates
                    international cooperation to mitigate climate change, adapt
                    to inevitable consequences, and foster sustainable practices
                    to ensure a resilient and equitable future for the planet.
                  </p>
                </div>
                <div className="right"></div>
              </div>

              <div ref={fourthRef} className="solution dets">
                <div className="left">
                  <h2>Solutions for carbon footprint</h2>
                  <p>
                    Addressing the escalating carbon footprint requires a
                    comprehensive and global approach. Transitioning to
                    renewable energy sources, such as solar, wind, and
                    hydropower, is crucial to reduce dependence on fossil fuels.
                    Improving energy efficiency in industries, buildings, and
                    transportation can significantly mitigate emissions.
                    Reforestation and sustainable land management help sequester
                    carbon, combating deforestation and land-use changes.
                    Adopting circular economy practices and reducing waste can
                    minimize emissions associated with production and disposal.
                    International collaboration is essential to establish and
                    uphold robust climate policies, including carbon pricing
                    mechanisms. Encouraging sustainable consumption patterns,
                    promoting eco-friendly technologies, and fostering public
                    awareness are vital components of the solution. Collective
                    efforts across governments, businesses, and individuals are
                    paramount to achieving meaningful reductions in carbon
                    footprints, ensuring a sustainable and resilient future for
                    the planet.
                  </p>
                </div>
                <div className="right"></div>
              </div>

              {/* <p>
                In conclusion, tackling the global challenge of carbon footprints requires a comprehensive approach. Shifting to renewable energy, improving efficiency, practicing sustainable land management, adopting circular economy principles, and implementing international climate policies are crucial steps. Additionally, promoting eco-friendly technologies and encouraging sustainable consumption patterns play key roles. Coordinated efforts across governments, industries, and individuals are essential for meaningful reductions in carbon footprints, ensuring a sustainable and resilient future.
                </p> */}
            </div>
          </div>

          <div className="last">
            <h1>Resources and contact info</h1>
          </div>
        </div>{" "}
      </main>

      <footer className="footer">
      <Footer />
      </footer>
    </>
  );
};

export default education;
