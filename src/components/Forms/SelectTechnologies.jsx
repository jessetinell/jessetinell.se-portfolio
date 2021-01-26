import { useState, useEffect } from 'react'
import styled from 'styled-components'

const Check = styled.div`
margin-right:.5em;
color:#48c084;
display:inline-block;
vertical-align:middle;
`
const TechListItem = styled.div`
cursor:pointer;
`
const Weight = styled.div`
display:inline-block;
vertical-align:middle;
font-size:.8em;
margin-left:.7em;
opacity: 0.6;
`
const Toggle = styled.div`
cursor:pointer;
margin-bottom:.2em;
font-size:.9em;
`

export default function Tags({ allTechnologies, initialValues, onChange }) {

    const [showTechList, setShowTechList] = useState(false)

    const [selectedTags, setSelectedTags] = useState(initialValues ? initialValues.map(initialValue => {
        return {
            id: initialValue._id, content: initialValue.name
        }
    }) : [])

    useEffect(() => {
        console.log(selectedTags)
        onChange(selectedTags.map(tag => {
            return tag.id
        }).join(','))

    }, [selectedTags])

    return <>

        {/* <DraggableArea
            tags={selectedTags}
            render={({ tag, index }) => (
                <Tag>
                    {tag.content}
                    <Remove onClick={() => {
                        setSelectedTags(selectedTags.filter(item => item.id !== tag.id));
                    }}>×</Remove>
                </Tag>
            )}
            onChange={tags => setSelectedTags(tags)}
        /> */}

        <Toggle onClick={() => setShowTechList(!showTechList)}>{showTechList ? "HIDE TECH" : "SHOW TECH"}</Toggle>

        {showTechList &&
            <>
                <div className="box">
                    {allTechnologies.map((technology, i) => {
                        let added = selectedTags.find(item => item.id === technology._id);

                        return <TechListItem key={i} onClick={() => {
                            if (added) {
                                setSelectedTags(selectedTags.filter(item => item.id !== technology._id));
                            }
                            else {
                                setSelectedTags(oldSelectedTagArray => [...oldSelectedTagArray, { id: technology._id, content: technology.name }])

                            }
                        }}>
                            {added && <Check>✓</Check>}
                            {technology.name}
                            <Weight>{technology.weight}</Weight>
                        </TechListItem>
                    })}
                </div>
            </>
        }

    </>

}