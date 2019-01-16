import React, { Component } from 'react';
import axios from 'axios';
import logo from '../../assets/netflix-logo.jpg';

export default class Netflix extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mylist: null,
			recommendations: null
		};
	}

	componentDidMount() {
		let url = 'http://localhost:8002';
		axios.get(url)
		.then(res => {
			this.setState({
				mylist: res.data.mylist,
				recommendations: res.data.recommendations,
			})
		})
	}

	remove(id) {
		this.setState({
			recommendations: [
				...this.state.recommendations,
				this.state.mylist.filter(ele => ele.id === id)[0]
			],
			mylist: [...this.state.mylist.filter(ele => ele.id !== id)]
		});
	}


	add(id) {
		this.setState({
			mylist: [
				...this.state.mylist,
				this.state.recommendations.filter(ele => ele.id === id)[0]
			],
			recommendations: [...this.state.recommendations.filter(ele => ele.id !== id)]
		});
	}

	renderItem(listData, remove, title, showTitleOnly = false) {
		if (showTitleOnly) {
			const titles = listData.map(ele => ele.title);
			return (
				<div>
					{
						titles.map(ele => {
							return (
								<div key={ele}>
									<h4>{ele}</h4>
									<br/>
								</div>
							);
						})
					}
				</div>
			);
		}

		return (
			<div>
				<ul>
					{listData.map(ele => {
						return (
							<div key={ele.id} className="col-md-6">
								<li className=''>
									<div className='item-img'>
										<h5> {ele.title} </h5>
										<img src={ele.img} alt="image" className="item-card"/>

										<div className='item-btn'>
                                            {
                                                remove ?
													<button className="btn btn-danger" onClick={this.remove.bind(this, ele.id)}>Delete</button> :
													<button className="btn btn-success" onClick={this.add.bind(this, ele.id)}>Add</button>
                                            }
										</div>
									</div>
								</li>
							</div>
						);
					})}
				</ul>
			</div>
		);
	}

	render() {
		if (!this.state.mylist || !this.state.recommendations) {
			return <div> Loading.... </div>;
		}
		const { mylist, recommendations } = this.state;
		return (
			<div className='container'>
				<div className="row">
					<img src={logo} width="168" height="50" />
				</div>
				{this.renderItem(mylist, true, 'My List')}
				{this.renderItem(recommendations, false, 'Recommendations')}
				{this.renderItem(mylist, true, 'Titles of My List', true)}
			</div>
		);
	}
}
