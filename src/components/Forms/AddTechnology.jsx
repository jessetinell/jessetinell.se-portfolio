import { useState } from 'react'
import styled from 'styled-components'
import { useForm } from "react-hook-form";
import axios from "axios"

const Container = styled.div`
margin-top: 5em;
`

export default function Tags({ onAdded }) {

    const { register, handleSubmit, setValue } = useForm()

    const [isSaving, setIsSaving] = useState(false)


    const save = (data) => {

        if (isSaving)
            return;

        setIsSaving(true)

        axios.post('/api/technologies', data)
            .then(response => {
                console.log(response.data)
                if (response.data && response.data.insertOneTechnology && response.data.insertOneTechnology._id) {
                    onAdded({
                        _id: response.data.insertOneTechnology._id,
                        name: data.name
                    })

                    setValue("name", "", {
                        shouldDirty: true
                    })
                    setValue("weight", "", {
                        shouldDirty: true
                    })
                }
            })
            .catch(err => {
                console.log(err)
                alert("Error occured. Please try again.")
            })
            .finally(() => {
                setIsSaving(false)
            })
    }

    return <>

        <Container className="box">
            <h3 style={{ margin: '0 0 .4em' }}>Add technology</h3>
            <form onSubmit={handleSubmit(save)}>
                <div className="row">
                    <div className="col-md-11">
                        <div className="forms-control">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" autoComplete="off" name="name" ref={register} placeholder="Name" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="forms-control">
                            <label htmlFor="weight">Weight</label>
                            <input type="number" id="weight" autoComplete="off" name="weight" ref={register} placeholder="Weight" />
                        </div>
                    </div>
                    <div className="col-md-7">
                        <button style={{ fontSize: '.8em', marginTop: '2em' }} className="button">{isSaving ? "Please wait..." : "Save"}</button>
                    </div>
                </div>
            </form>
        </Container>

    </>

}