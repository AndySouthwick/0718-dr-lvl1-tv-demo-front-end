import React, { Component } from 'react'
import TVShow from './TVShow'

class ManagePage extends Component {
    state = {
        tvShows: [],
        nameInProgress: '',
        ratingInProgress: '',
        imageUrlInProgress: 'https://caterville.files.wordpress.com/2013/10/fe0c8-pizza-cat.jpg'
    }

    rootUrl = process.env.REACT_APP_API_ROOT || 'http://localhost:3003/tv-show'

    handleNameChange = (event) => {
        this.setState({
            nameInProgress: event.target.value
        })
    }

    handleRatingChange = (event) => {
        this.setState({
            ratingInProgress: event.target.value
        })
    }

    handleImageUrlChange = (event) => {
        this.setState({
            imageUrlInProgress: event.target.value
        })
    }

    tvShowSelected = () => {
        this.setState({
            nameInProgress: this.props.tvShow.name,
            ratingInProgress: this.props.tvShow.rating,
            imageUrlInProgress: this.props.tvShow.imageUrl
        })
    }

    tvShowDeleted = () => {
        this.props.tvShowDeleted()
    }

    saveTVShow = () => {
        this.postTVShow({
            name: this.state.nameInProgress,
            rating: Number(this.state.ratingInProgress),
            imageUrl: this.state.imageUrlInProgress
        })
    }


    getTVShows = async () => {
        try {
            const res = await fetch(this.rootUrl)
            const tvShows = await res.json()
            this.setState({ tvShows, err: null })
        } catch (err) {
            this.setState({ err })
        }
    }

    postTVShow = async (tvShow) => {
        try {
            const response = await fetch(this.rootUrl, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify(tvShow)
            })

            const result = await response.json()
            if (result.isJoi) {
                throw result
            }

            this.setState({
                nameInProgress: '',
                ratingInProgress: '',
                imageUrlInProgress: ''
            })

            await this.getTVShows()
        } catch (err) {
            this.setState({ err })
        }
    }

    componentDidMount = () => {
        console.log(process, process.env, process.env, process.env.REACT_APP_API_ROOT)
        this.getTVShows()
    }

    renderTVShows = () => {
        return this.state.tvShows.map(
            (tvShow, i) => {
                return (
                    <TVShow key={i} name={tvShow.name} allowDelete={true} selectHandler={this.tvShowSelected} deleteHandler={this.tvShowDeleted} />
                )
            }
        )
    }

    renderError = () => {
        const error = this.state.err
        if (error) {
            const message = error.isJoi
                ? error.details.map(d => (<div>{d.message}</div>))
                : 'Sorry, there was an error.'

            return (<div>{message}</div>)
        }
    }

    render() {
        return (
            <main>
                {this.renderError()}
                <section>
                    <h2>Shows</h2>
                    {this.renderTVShows()}
                </section>
                <section>
                    <h2>New/Edit</h2>
                    <form>
                        <div>
                            <label htmlFor="name">Name:</label>
                            <input id="name" type="text" value={this.state.nameInProgress} onChange={this.handleNameChange} />
                        </div>
                        <div>
                            <label htmlFor="rating">Rating:</label>
                            <input id="rating" type="text" value={this.state.ratingInProgress} onChange={this.handleRatingChange} />
                        </div>
                        <div>
                            <label htmlFor="image-url">Image Url:</label>
                            <input id="image-url" type="text" value={this.state.imageUrlInProgress} onChange={this.handleImageUrlChange} />
                        </div>
                    </form>
                    <button onClick={this.saveTVShow}>Submit</button>
                </section>
            </main>
        )
    }
}

export default ManagePage