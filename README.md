        shownData.map((location) => (
          <ListElement
            text={location.name}
            key={location.name}
            url={location.url}
            setData={setData}
            isAreasShown={isAreasShown}
            setIsAreasShown={setIsAreasShown}
            setAreas={setAreas}
          ></ListElement>
        ))