import React, { useState } from 'react';
import dynamic from 'next/dynamic'
import axios from 'axios';
import { useForm } from "react-hook-form";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import Router from 'next/router'
import { GetProjectById } from '@/db'
import AddTechnology from '@/components/Forms/AddTechnology'


const SelectTechnologies = dynamic(() => import('@/components/Forms/SelectTechnologies'))

import styled from 'styled-components'

const Check = styled.div`
margin: 1.1em 0px 2em;
font-size: 0.9em;
`
const NewTag = styled.div`
background: #E91E63;
padding: .3em;
display: inline-block;
font-size: 0.9em;
margin-bottom: 1em;
border-radius: 3px;
box-shadow: 0 0 10px #e91f62;
line-height: 1;
`

function Rating({ project, allTechnologies }) {

    const [technologies, setTechnologies] = useState(allTechnologies)

    const { register, handleSubmit, watch, errors, reset, setValue } = useForm({
        defaultValues: {
            ...project,
            // Format technologies to a string
            technologies: project?.technologies?.map(technology => {
                return technology._id;
            }).join(',')
        }
    });

    let watchId = watch("_id", false)

    const [isSavingReview, setIsSavingReview] = useState(false)


    const saveReview = (data) => {

        if (isSavingReview)
            return;

        setIsSavingReview(true)

        axios.post('/api/projects', data)
            .then(response => {
                if (response.data && response.data.insertOneProject && response.data.insertOneProject._id) {
                    // Full relaod = Easiest + safest
                    window.location.href = `/edit/${response.data.insertOneProject._id}`
                }
            })
            .catch(err => {
                console.log(err)
                alert("Error occured. Please try again.")
            })
            .finally(() => {
                setIsSavingReview(false)
            })
    }

    return (
        <>
            <div className="container" style={{ width: 700 }}>
                <div style={{ textAlign: 'right', marginTop: '0', fontSize: '.6em' }}>
                    <div className="button" style={{ marginRight: '.3em' }} onClick={() => {
                        setValue("_id", "")
                        setValue("name", "")
                    }}>
                        DUPLICATE
                    </div>
                    <div className="button" onClick={() => {
                        // Full relaod = Easiest + safest
                        window.location.href = "/edit/1"
                    }}>
                        NEW
                </div>
                </div>

                <form onSubmit={handleSubmit(saveReview)}>
                    {!watchId && <NewTag>NEW</NewTag>}
                    <div className="form-control">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" ref={register} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="short_description">Short description</label>
                        <input type="text" id="short_description" name="short_description" ref={register} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="url">URL</label>
                        <input type="text" id="url" name="url" ref={register} />
                    </div>

                    <div className="row">
                        <div className="col-sm-12">
                            <div className="form-control">
                                <label htmlFor="year_from">Year from</label>
                                <input type="number" id="year_from" name="year_from" ref={register({ required: true })} placeholder="Year from" />
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className="form-control">
                                <label htmlFor="year_to">Year to <small>(0 for present)</small></label>
                                <input type="number" id="year_to" name="year_to" ref={register({ required: true })} placeholder="Year to" />
                            </div>
                        </div>
                    </div>

                    <div className="form-control">
                        <label htmlFor="role">
                            Role
                        </label>
                        <select name="role" id="role" ref={register}>
                            <option value="techlead">Tech Lead</option>
                            <option value="productowner">Product Owner</option>
                            <option value="developer">Developer</option>
                            <option value="indiehacker">Indie Hacker</option>
                            <option value="cofounder">Co-founder</option>
                        </select>
                    </div>

                    <div className="form-control">
                        <label htmlFor="type">
                            Type
                        </label>
                        <select name="type" id="type" ref={register}>
                            <option value="private">Private</option>
                            <option value="professional">Professional</option>
                            <option value="freelance">Freelance</option>
                        </select>
                    </div>

                    <input type="hidden" name="technologies" ref={register} />

                    <SelectTechnologies initialValues={project?.technologies} allTechnologies={technologies} onChange={(value) => {
                        setValue("technologies", value, { shouldDirty: true })
                    }} />

                    <input type="hidden" ref={register} name="_id" />

                    <button style={{ fontSize: '1.2em', marginTop: '2em' }} className="button button--full">{isSavingReview ? "Please wait..." : "Save"}</button>
                </form>


                <AddTechnology onAdded={(technology) => {
                    setTechnologies(oldArray => [...oldArray, technology])
                }} />

            </div>

        </>
    );
}


export async function getServerSideProps({ params }) {
    const client = new ApolloClient({
        uri: process.env.GRAPHQL_API,
        headers: {
            'apiKey': process.env.GRAPHQL_API_KEY
        },
        cache: new InMemoryCache()
    });

    const { data } = await client.query({
        query: gql`
        query GetTechnologies{
          technologies(sortBy:WEIGHT_DESC) {
            _id
            name
            weight
          }
        }
        `
    });


    let project_id = params.project !== '1' ? params.project : null;

    let props = {
        allTechnologies: data.technologies || []
    }

    let project = await GetProjectById(project_id)
    if (project) {
        props['project'] = project;
    }

    return { props: props }
}





export default Rating;