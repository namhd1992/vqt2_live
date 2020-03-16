import React from 'react'
import { bindActionCreators } from 'redux'
import Pagination from "react-js-pagination";
import { connect } from 'react-redux'
import './css/style.css';
import {
	getDetailData,
	getRotationDetailData,
	getRotationDetailDataUser,
	pickCard,
	buyTurn,
	getTuDo,
	getHistoryTuDo,
	getCodeBonus,
	getVinhDanh,
	getCountBonus,
	getKeys,
} from '../../modules/lucky'
import {
	getData
} from '../../modules/profile'

import arrow_down from './images/arrow-down.png'
import backtotop from './images/backtotop.png'
import slide from './images/slide.gif'
import banner_slider_2 from './images/banner-slider-2.png'
import banner_slider_3 from './images/banner-slider-3.png'
import bg_acc from './images/bg-acc.png'
import bg_bang_vinh_danh from './images/bg-bang-vinh-danh.png'
import bg_cloud from './images/bg-cloud.png';
// import bg_float_left from './images/bg-float-left.gif';
import bg_float_right from './images/bg-float-right.png';
import bg_footer from './images/bg-footer.png';
import bg_header from './images/bg-header.png';
import bg_popup_giaithuong from './images/bg-popup-giaithuong.png';
import bg_step from './images/bg-step.png';
import bg_the_le from './images/bg-the-le.png';
import bg_the_le_mobile from './images/bg-the-le-mobile.png';
import bg_time from './images/bg-time.png';
import btn_hotline_hotro from './images/btn-hotline-hotro.png';
import btn_huong_dan_mua_the from './images/btn-huong-dan-mua-the.png';
import btn_mo_tu_dong from './images/btn-mo-tu-dong.png';
import btn_mo_x1 from './images/btn-mo-x1.png';
import btn_mua_chia_khoa from './images/btn-mua-chia-khoa.png';
import btn_nap_game from './images/btn-nap-game.png';
import btn_nap_scoin from './images/btn-nap-scoin.png';
import btn_nhan_tb_sk from './images/btn-nhan-tb-sk.png';
import btn_them_luot from './images/btn-them-luot.png';
import btn_xac_nhan_mua from './images/btn-xac-nhan-mua.png';
import btn_xem_kho_bau from './images/btn-xem-kho-bau.png';
import close_icon from './images/close-icon.png';
import header_bang_vinh_danh from './images/header-bang-vinh-danh.png';
import header_giaithuong from './images/header-giaithuong.png';
import icon_noti from './images/icon-noti.png';
import img_step1 from './images/img-step1.png';
import img_step2 from './images/img-step2.png';
import img_step3 from './images/img-step3.png';
import key_brown_icon from './images/key-brown-icon.png';
import key_icon from './images/key-icon.png';
import key_yellow_icon from './images/key-yellow-icon.png';
import logo from './images/logo.png';
import logo_scoin from './images/logo-scoin.png';
import logo_splay from './images/logo-splay.png';
import logo_vtcmobile from './images/logo-vtcmobile.png';
import next_icon from './images/next-icon.png';
import prev_icon from './images/prev-icon.png';
import ruong_icon from './images/ruong-icon.png';
import ruong_icons from './images/ruong-icons.png';
import khobau from './images/khobau.gif';
// import img_thongbao from './images/img-thongbao.png';

import ReactResizeDetector from 'react-resize-detector'
// import spin from './images/spin.gif';
import $ from 'jquery';
import 'bootstrap';

const styles = {
	paper: {
		background: "#fff",
	},
};

class Lucky_Rotation extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			limit: 10,
			isAll:true,
			stop:true,
			auto: false,
			userTurnSpin:{},
			itemOfSpin:[],
			luckySpin:{},
			turnsFree:0,
			isLogin:false,
			day:'00',
			hour:'00', 
			minute:'00', 
			second:'00',
			itemBonus:{},
			type_item: 'highlights',
			
			activeVinhDanh:1,
			listVinhDanh:[],
			countVinhDanh:0,

			activeKey:1,
			listKey:[],
			countKey:0,

			activeRuong:1,
			listRuong:[],
			countRuong:0,

			activeBonus:1,
			listCodeBonus:[],
			countCodeBonus:0,

			dataTuDo:[],
			dataCodeBonus:[],	
			listHistory:[],
			textAuto: true,
			
			listCountBonus:[],
			width:0,
			height:0,
			code:false,
			scoinCard:false,
			inputValue: '',
			noti_mdt:false,
			noti_tudo:false,
			numberPage:3,
			message_status:'',
			data_auto:[],
			isSpin:false,
			closeAuto:true,
			message_error:'',
			server_err:false,
			user:{},
			xacthuc:false,
			status_sukien:'',
			start:false,
			live:false,
			finish: false,
			turnsBuyInfo:[],
			soinValue:0,
			hideNav:false,

		};
	}
	componentWillMount(){
		window.removeEventListener('scroll', this.handleScroll);
		this.resize()
	}

	componentDidMount(){
		var user = JSON.parse(localStorage.getItem("user"));
		if (user !== null) {
			this.props.getRotationDetailDataUser(user.access_token, 1).then(()=>{
				var data=this.props.dataRotationWithUser;
				if(data!==undefined){
					if(data.status==='01'){
						this.getStatus(data.data.luckySpin);
						this.setState({userTurnSpin:data.data.userTurnSpin, user:user, itemOfSpin:data.data.itemOfSpin, luckySpin:data.data.luckySpin, turnsFree:(data.data.userTurnSpin.turnsFree+data.data.userTurnSpin.turnsBuy), turnsBuyInfo:data.data.userTurnSpin.turnsBuyInfo, isLogin:true})
					}else{
						$('#myModal11').modal('show');
						this.setState({message_error:'Không lấy được dữ liệu người dùng. Vui lòng tải lại trang.'})
					}
				}else{
					// $('#myModal12').modal('show');
					this.setState({server_err:true})
				}
				
			});
		} else {
			this.props.getRotationDetailData(1).then(()=>{
				var data=this.props.dataRotation;
				if(data!==undefined){
					if(data.status==='01'){
						this.getStatus(data.data.luckySpin);
						this.setState({userTurnSpin:data.data.userTurnSpin, itemOfSpin:data.data.itemOfSpin, luckySpin:data.data.luckySpin, turnsFree:(data.data.userTurnSpin.turnsFree+data.data.userTurnSpin.turnsBuy), isLogin:false})
					}else{
						$('#myModal11').modal('show');
						this.setState({message_error:'Không lấy được dữ liệu.  Vui lòng tải lại trang.'})
					}
				}else{
					// $('#myModal12').modal('show');
					this.setState({server_err:true})
				}
			});
		}
		this.getDataVinhDanh('highlights',1);
		window.addEventListener('scroll', this.handleScroll);
		$("#demo").carousel({interval: 3000});
	}

	componentWillUnmount() {
		// clearInterval(this.state.intervalId);
		this.setState({ auto : !this.state.auto});
	}

	resize() {
		let isMobile = (window.innerWidth <= 760);
		if (isMobile) {
			this.setState({limit:5});
		}else{
			this.setState({limit:10});
		}
	}

	onResize=()=>{
		this.resize()
	}

	getStatus=(luckySpin)=>{
		var start=luckySpin.startDate;
		var end=luckySpin.endDate;
		var time=Date.now();

		if (time < start) {
			this.timeRemain(start)
			this.setState({ status_sukien: 'Sự kiện chưa diễn ra.', message_status:"Sự kiện chưa diễn ra.", start:true});
		}
		if (time > start && time < end) {
			this.timeRemain(end)
			this.setState({ status_sukien: "Sự kiện đang diễn ra còn", live:true});
		}
		if (time > end) {
			this.setState({ status_sukien: "Sự kiện đã kết thúc.", message_status:"Sự kiện đã kết thúc.", finish:true});
		}
	}

	handleScroll = (event) => {
		if (document.body.getBoundingClientRect().top < -300){
			$("#button").show();
		}else{
			$("#button").hide();
		}
	}

	loginAction = () => {
		const {server_err}=this.state;
		if(!server_err){
			if (typeof(Storage) !== "undefined") {
				var currentPath = window.location.pathname;
				localStorage.setItem("currentPath", currentPath);
			} else {
				console.log("Trình duyệt không hỗ trợ localStorage");
			}
			window.location.replace(`http://graph.vtcmobile.vn/oauth/authorize?client_id=58306439627cac03c8e4259a87e2e1ca&redirect_uri=${window.location.protocol}//${window.location.host}/login&agencyid=0`)
			// window.location.replace(`http://sandbox.graph.vtcmobile.vn/oauth/authorize?client_id=4e7549789b14693eda4e019faaa0c446&agencyid=0&redirect_uri=${window.location.protocol}//${window.location.host}/`);
		}else{
			$('#myModal12').modal('show');
		}
	}
	logoutAction = () => {
		localStorage.removeItem("user");
		window.location.replace(
			`https://graph.vtcmobile.vn/oauth/authorize?client_id=58306439627cac03c8e4259a87e2e1ca&redirect_uri=${window.location.protocol}//${window.location.host}&action=logout&agencyid=0`,
		);

		// window.location.replace(
		// 	`http://sandbox.graph.vtcmobile.vn/oauth/authorize?client_id=4e7549789b14693eda4e019faaa0c446&redirect_uri=${window.location.protocol}//${window.location.host}&action=logout&agencyid=0`,
		// );
	}

	start=()=>{
		const {turnsFree, itemOfSpin, luckySpin, isSpin, closeAuto, auto, type_item}=this.state;
		var _this = this;
		var user = JSON.parse(localStorage.getItem("user"));
		var time=Date.now();
		if (user !== null) {
			if(turnsFree>0){
				this.props.pickCard(user.access_token, luckySpin.id).then(()=>{
					var data=_this.props.dataPick;
					var list=this.state.data_auto;
					
					if(data!==undefined){
						if(data.status ==="01"){
							if(auto){
								var elem = document.getElementById('auto');
								list.push(data.data.description);
								this.getDetailData()
								_this.setState({data_auto: list});
								elem.scrollTop = elem.scrollHeight;
								if(data.data.type!=="ACTION"){
									this.setState({noti_tudo:true})
									this.getDataVinhDanh(type_item, 1);	
								}
							}else{
								$('#Khobau').modal('show');
								setTimeout(() => {
									if(data.data.type!=="ACTION"){
										$('#myModal4').modal('show');
										this.setState({noti_tudo:true})
										this.getDataVinhDanh(type_item, 1);
									}else{
										$('#myModal7').modal('show');
									}
									this.getDetailData();
									$('#Khobau').modal('hide');
									_this.setState({itemBonus: data.data});
								}, 1700);
								
							}	
							
						}else if(data.status ==="04"){
							$('#myModal13').modal('show');
						}else if(data.status ==="07"){
								this.setState({message_status:"Sự kiện chưa diễn ra hoặc đã kết thúc."},()=>{
								$('#myModal8').modal('show');
							})
						}else if(data.status ==="10"){
							this.setState({message_status:"Bạn cần xác nhận số ĐT để chơi.", xacthuc:true},()=>{
								$('#myModal8').modal('show');
							})
						}else{
							$('#myModal11').modal('show');
							this.setState({message_error:'Sự kiện đang có lỗi. Vui lòng tải lại trang.'})
						}
					}else{
						$('#myModal12').modal('show');
						this.setState({server_err:true})
					}
				})
				
			}else{
				$('#myModal6').modal('show');
			}
		} else {
			$('#myModal5').modal('show');
		}
	}

	btnStart=()=>{
		const {server_err, start, finish}=this.state;
		if(server_err){
			$('#myModal12').modal('show');
		}else{
			if(start){
				this.setState({message_status:"Sự kiện chưa diễn ra."},()=>{
					$('#myModal8').modal('show');
				})
			}else if(finish){
				this.setState({message_status:"Sự kiện đã kết thúc."},()=>{
					$('#myModal8').modal('show');
				})
			}else{
				this.setState({data_auto:[], closeAuto:true},()=>{
					this.start();
				})
			}
		}
	}


	autoOpen=()=>{
		const {turnsFree, luckySpin, server_err, start, finish}=this.state;
		var user = JSON.parse(localStorage.getItem("user"));
		var time=Date.now();
		if(server_err){
			$('#myModal12').modal('show');
		}else{
			if (user !== null) {
				if(start){
					this.setState({message_status:"Sự kiện chưa diễn ra."},()=>{
						$('#myModal8').modal('show');
					})
				}else if(finish){
					this.setState({message_status:"Sự kiện đã kết thúc."},()=>{
						$('#myModal8').modal('show');
					})
				}else{
					if(turnsFree>0){
						$('#Khobau').modal('show');
						setTimeout(() => {
							$('#myModal9').modal('show');
							this.setState({auto:true},()=>{
								this.start()
							});
							$('#Khobau').modal('hide');
						}, 1700);
						
					}else{
						$('#myModal6').modal('show');
					}
				}
			} else {
				$('#myModal5').modal('show');
			}
		}	
	}


	getDetailData=()=>{
		const {auto, luckySpin}=this.state;
		var user = JSON.parse(localStorage.getItem("user"));
		this.props.getRotationDetailDataUser(user.access_token, luckySpin.id).then(()=>{
			var data=this.props.dataRotationWithUser;
			if(data!==undefined){
				var turnsFree=data.data.userTurnSpin.turnsFree+data.data.userTurnSpin.turnsBuy;
				if(data.status==='01'){
					if(turnsFree>0){
						if(auto){
							var timeout =setTimeout(() => {
								this.start();
							}, 2000);
							this.setState({timeout: timeout});	
						}
					}else{
						this.setState({textAuto:false})
					}
					this.setState({turnsFree:turnsFree, turnsBuyInfo:data.data.userTurnSpin.turnsBuyInfo})
				}else if(data.status ==="04"){
					$('#myModal13').modal('show');
				}else{
					$('#myModal11').modal('show');
					this.setState({message_error:'Lỗi hệ thống. Vui lòng thử lại.'})
				}
			}else{
				$('#myModal12').modal('show');
				this.setState({server_err:true})
			}
		});
	}


	timeRemain=(times)=>{
		var _this=this;
		setInterval(()=>{
			var time=(times-Date.now())/1000;
			if(time>0){
				var day=Math.floor(time/86400) > 9 ? Math.floor(time/86400) : `0${Math.floor(time/86400)}`;
				var hour=Math.floor((time%86400)/3600) > 9 ? Math.floor((time%86400)/3600) : `0${Math.floor((time%86400)/3600)}`;
				var minute=Math.floor(((time%86400)%3600)/60) > 9 ? Math.floor(((time%86400)%3600)/60) : `0${Math.floor(((time%86400)%3600)/60)}`;
				var second=Math.ceil(((time%86400)%3600)%60) > 9 ? Math.ceil(((time%86400)%3600)%60) : `0${Math.ceil(((time%86400)%3600)%60)}`;
				_this.setState({day:day, hour: hour, minute: minute, second:second})
			}
		}, 1000);
	}


	showModalBonus=()=>{
		$('#myModal').modal('show'); 
	}

	hideModalBonus=()=>{
		$('#myModal').modal('hide');
	}

	showModalRules=()=>{
		$('#myModal1').modal('show'); 
	}

	hideModalRules=()=>{
		$('#myModal1').modal('hide');
	}

	showModalTuDo=()=>{
		var user = JSON.parse(localStorage.getItem("user"));
		if (user !== null) {
			this.getDataTuDo(user);
			$('#myModal4').modal('hide');
			$('#myModal2').modal('show');
		}else {
			$('#myModal5').modal('show');
		}
	}




	showModalCodeBonus=(pageNumber)=>{
		var user = JSON.parse(localStorage.getItem("user"));
		console.log(user)
		if(user !== null){
			this.getBonus(user, pageNumber)
			$('#myModal4').modal('hide');
		}else {
			$('#myModal5').modal('show');
		}
	}

	getBonus=(user, pageNumber)=>{
		const {luckySpin, limit}=this.state;
		this.props.getTuDo(user.access_token, luckySpin.id, limit, (pageNumber-1)).then(()=>{
			var data=this.props.dataTuDo;
			if(data!==undefined){
				if(data.status==='01'){
					$('#LichSu').modal('show');
					this.setState({listCodeBonus:data.data, countCodeBonus:data.totalRecords, noti_tudo:false})
				}else{
					$('#myModal11').modal('show');
					this.setState({message_error:'Chưa tải được dữ liệu. Vui lòng thử lại'})
				}
			}else{
				$('#myModal12').modal('show');
				this.setState({server_err:true})
			}
		});
	}



	getRuong=(user, pageNumber)=>{
		const {luckySpin, limit}=this.state;
		// var offsetTuDo=(pageNumber-1)*limit;
		this.props.getHistoryTuDo(user.access_token, luckySpin.id, limit, (pageNumber-1)).then(()=>{
			var data=this.props.dataHistoryTuDo;
			if(data!==undefined){
				if(data.status==='01'){
					this.setState({listRuong:data.data, countRuong: data.totalRecords})
				}else{
					$('#myModal11').modal('show');
					this.setState({message_error:'Chưa tải được dữ liệu. Vui lòng thử lại'})
				}
			}else{
				$('#myModal12').modal('show');
				this.setState({server_err:true})
			}
		});
	}

	getKey=(user, pageNumber)=>{
		const {luckySpin, limit}=this.state;
		// var offsetTuDo=(pageNumber-1)*limit;
		this.props.getKeys(user.access_token, luckySpin.id, limit, (pageNumber-1)).then(()=>{
			var data=this.props.dataListKey;
			if(data!==undefined){
				if(data.status==='01'){
					this.setState({listKey:data.data, countKey: data.totalRecords})
				}else{
					$('#myModal11').modal('show');
					this.setState({message_error:'Chưa tải được dữ liệu. Vui lòng thử lại'})
				}
			}else{
				$('#myModal12').modal('show');
				this.setState({server_err:true})
			}
		});
	}

	getDataVinhDanh=(type_item, pageNumber)=>{
		this.setState({type_item:type_item},()=>{
			this.getVinhDanh(pageNumber);
		})
	}

	getVinhDanh=(pageNumber)=>{
		const {limit, luckySpin, type_item}=this.state;
		this.props.getVinhDanh(1, 10, (pageNumber-1), type_item).then(()=>{
			var data=this.props.dataVinhDanh;
			if(data!==undefined){
				
				if(data.status==='01'){	
					var n=10-data.data.length;
					var listEmpty=[];
					for (let i = 0; i < n; i++) {
						let obj={date: '...', description: null, itemName: '...', userName: '...', phone: '...'}
						listEmpty.push(obj);
					}
					var listData=data.data.concat(listEmpty)
					this.setState({listVinhDanh:listData, countVinhDanh: Math.ceil(data.totalRecords/10)*10})
				}else if(data.status==='03'){
					var listEmpty=[];
					for (let i = 0; i < 10; i++) {
						let obj={date: '...', description: null, itemName: '...', userName: '...', phone: '...'}
						listEmpty.push(obj);
					}
					this.setState({listVinhDanh:listEmpty, countVinhDanh: 10})
				}else{
					$('#myModal11').modal('show');
					this.setState({message_error:'Không lấy được dữ liệu bảng vinh danh.'})
				}
			}else{
				$('#myModal12').modal('show');
				this.setState({server_err:true})
			}
		});
	}



	openGiaiThuong=()=>{
		// var offsetTuDo=(pageNumber-1)*limit;
		this.props.getCountBonus().then(()=>{
			
			var data=this.props.dataCountBonus;
			if(data!==undefined){
				if(data.status==='01'){
					$('#GiaiThuong').modal('show');
					this.setState({listCountBonus:data.data})
				}else{
					$('#myModal11').modal('show');
					this.setState({message_error:'Chưa tải được dữ liệu. Vui lòng thử lại'})
				}
			}else{
				$('#myModal12').modal('show');
				this.setState({server_err:true})
			}
		});
		
	}

	openThemLuot=()=>{
		const {start, finish}=this.state;
		var user = JSON.parse(localStorage.getItem("user"));
		if (user !== null) {
			if(start){
				this.setState({message_status:"Sự kiện chưa diễn ra."},()=>{
					$('#myModal8').modal('show');
				})
				
			}else if(finish){
				this.setState({message_status:"Sự kiện đã kết thúc."},()=>{
					$('#myModal8').modal('show');
				})
			}else{
				$('#ThemLuot').modal('show');
			}
		}else {
			$('#myModal5').modal('show');
		}
	}

	closePopupAuto=()=>{
		const {timeout}=this.state;
		this.setState({ auto:false});
		clearTimeout(timeout)
		$('#myModal9').modal('hide');
	}



	hideModalDetailBonus=()=>{
		$('#myModal4').modal('hide');
	}
	closeServerErr=()=>{
		$('#myModal12').modal('hide');
	}

	closeModal7=()=>{
		$('#myModal7').modal('hide');
		this.btnStart()
	}

	closeModal4=()=>{
		$('#myModal4').modal('hide');
		this.btnStart();
	}


	handlePageChangeRuong=(pageNumber)=> {
		var user = JSON.parse(localStorage.getItem("user"));
		this.setState({activeRuong: pageNumber},()=>{
			this.getRuong(user, pageNumber)
		})
	}

	handlePageChangeKey=(pageNumber)=> {
		var user = JSON.parse(localStorage.getItem("user"));
		this.setState({activeKey: pageNumber},()=>{
			this.getKey(user, pageNumber)
		})
	}

	handlePageChangeCodeBonus=(pageNumber)=> {
		var user = JSON.parse(localStorage.getItem("user"));
		this.setState({activeBonus: pageNumber},()=>{
			this.getBonus(user, pageNumber)
		})
	}

	handlePageChangeVinhDanh=(pageNumber)=> {
		const {type_item}=this.state;
		this.setState({activeVinhDanh: pageNumber},()=>{
			this.getDataVinhDanh(type_item, pageNumber)
		})
	}

	openTabNapScoin=(url)=> {
		window.open(url, '_blank').focus();
	}

	xacThuc=(url)=> {
		localStorage.removeItem("user");
		document.location.reload(true);
		$('#myModal8').modal('hide');
		window.open(url, '_blank').focus();
	}


	randomItemIndex=()=>{
		// var item = items[Math.floor(Math.random()*items.length)];
	}
	getUsername=(name)=>{
		var len=name.length;
		if(len>10){
		  return name.substring(0,10)+'...'
		}else{
		  return name;
		}
	}
	titleName=(name)=>{
		return 'Xin chào '+name;
	}

	getNameScoin=(name)=>{
		if(name.indexOf('Scoin')!==-1){
			return name.substring(0, name.indexOf('Scoin'))
		}else{
			return name
		}
	}


	render() {
		const {textAuto, soinValue,listCountBonus, listKey, activeKey, turnsBuyInfo,status_sukien, xacthuc, scoinCard,height, width, dialogLoginOpen, dialogBonus, auto, dialogWarning, textWarning, isLogin, userTurnSpin, day, hour, minute, second, code,numberPage, message_status, data_auto,message_error,
			activeRuong, activeHistory, activeBonus, activeVinhDanh, limit, countCodeBonus, countRuong, countKey, countVinhDanh, listHistory, listCodeBonus, listRuong, listVinhDanh,itemBonus, turnsFree, noti_mdt, noti_tudo, hour_live, minute_live, second_live, user}=this.state;
		const { classes } = this.props;
		const notification_tudo=noti_tudo?(<span className="badge badge-pill badge-danger position-absolute noti-tudo">!</span>):(<span></span>);
		return (<div style={{backgroundColor:'#f5e4b9'}}>
			<a href="#logo" id="button"><img src={backtotop} alt="Back to Top" width="16" /></a>
			<div id="top" class="container-fluid header">
				<div class="container position-relative h-100 w-100">
				{(isLogin)?(<ul class="box-account nav font-iCielPantonLight">
		<li class="bg-acc nav-item text-center"><a class="d-block pt-03 text-orange" href="#" title={this.titleName(userTurnSpin.currName)}><span class="text-white">Xin chào</span> {this.getUsername(userTurnSpin.currName)}</a></li>
						<li class="bg-acc nav-item text-center" onClick={this.logoutAction}><a class="d-block pt-03 font-italic text-orange" href="#" title="Đăng xuất">Đăng Xuất</a></li>
						
						
					</ul>):(<ul class="box-account nav font-iCielPantonLight justify-content-end">
							<li class="bg-acc nav-item text-center" onClick={this.loginAction}><a class="d-block pt-03 font-italic text-orange" href="#" title="Đăng xuất">Đăng Nhập</a></li>
					</ul>)}
					<div id="logo" class="logo"><img src={logo} class="img-fluid" /></div>
					<div class="table-responsive box-time">
						<h2 class="font-iCielPantonBlack text-brown-shadow">{status_sukien}</h2>
						<table class="table table-borderless tbl-boxtime" align="center">
							<tr>
								<td class="cell-timer-p1 text-white display-5 text-center font-weight-bold pb-0">{day}</td>
								<td class="cell-timer-p1 text-white display-5 text-center font-weight-bold pb-0">{hour}</td>
								<td class="cell-timer-p1 text-white display-5 text-center font-weight-bold pb-0">{minute}</td>
								<td class="cell-timer-p1 text-white display-5 text-center font-weight-bold pb-0">{second}</td>
							</tr>
							<tr>
								<td align="center" class="p-0 h6">Ngày</td>
								<td align="center" class="p-0 h6">Giờ</td>
								<td align="center" class="p-0 h6">Phút</td>
								<td align="center" class="p-0 h6">Giây</td>
							</tr>
						</table>
					</div>
					<div id="demo" class="box-slider">
						<img src={slide} class="img-fluid" />
						<div>
							<p style={{textAlign:'center', color:'#fff'}}>Chìa khóa còn lại: {turnsFree ? turnsFree.toLocaleString() :0} <img src={key_yellow_icon}  width="20"/></p>
						</div>   
					</div>
					<div class="button-group mx-auto">
						<p class="text-center row mx-0">
						<a class="col-6 px-0 btnStart" title="Mở 1 lần" style={{cursor:'pointer'}}  onClick={this.btnStart}><img src={btn_mo_x1} class="img-fluid" /></a>
						<a class="col-6 px-0 btnAuto" title="Mở tự động" style={{cursor:'pointer'}} onClick={this.autoOpen}><img src={btn_mo_tu_dong} class="img-fluid" /></a>
						</p>
						<p class="text-center">
						<a href="" title="Thêm lượt" data-toggle="modal" onClick={this.openThemLuot}><img src={btn_them_luot} class="img-fluid img-75 themLuot" /></a>
						</p>
					</div>
					<div class="float-left">
						<ul class="nav flex-column text-float-left">
							<li class="mt-5"><a href="https://scoin.vn/nap-game" title="Nạp Game" target="_blank">&nbsp;</a></li>
							<li class="mt-3"><a href="#TheLe" title="Thể lệ">&nbsp;</a></li>
							<li class="mt-3"><a href="#VinhDanh" title="Vinh danh">&nbsp;</a></li>
						</ul>
					</div>
					<div class="float-right">
						<ul class="nav flex-column text-float-right">
							<li class="mt-3"><a href="" title="Giải thưởng" data-toggle="modal"  onClick={this.openGiaiThuong}>&nbsp;</a></li>
							<li class="mt-3"><a href="#" title="Lịch sử" data-toggle="modal"  onClick={()=>this.showModalCodeBonus(1)}>&nbsp;</a>{notification_tudo}</li>
						</ul>
					</div>
				</div>
			</div>
			{/* End p1 */}

			<div class="container thele" id="TheLe">
				<h2 class="font-iCielPantonBlack text-brown-shadow text-uppercase text-center">Thể lệ sự kiện</h2>
				
				<div class="content-thele text-center mx-auto pt-4">
					<h4 class="font18 font-iCielPantonLight font-weight-bold">I. Đối tượng tham gia</h4>
					<ul className='thele_3'>
						<li>Tất cả game thủ có tài khoản Scoin. Nếu chưa có <a href="https://scoin.vn/" title="Đăng ký" target="_blank">Đăng ký tại đây</a>. </li>
						<li>Thời gian SK diễn ra từ 10:00 ngày 19.03 - hết ngày 18.04.2020. Sau khi kết thúc, số chìa khóa sẽ được xóa khỏi hệ thống.</li>
					</ul>
					<h4 class="font18 font-iCielPantonLight font-weight-bold">II. Cách nhận chìa khóa mở rương báu:</h4>
					<div class="box-thele">
						<div class="step-thele mx-auto">
							<p>Nạp thẻ Scoin/ thẻ Scoin vào các game do VTC Mobile phát hành.</p>
							<ul>
								<li class="font-iCielPantonBlack text-brown">Mỗi 1 Scoin bạn nạp vào game từ Thẻ Scoin sẽ nhận được 2 Điểm</li>
								<li class="font-iCielPantonBlack text-brown">Mỗi 1 Scoin bạn nạp vào game từ ví Scoin sẽ nhận được 1 Điểm.</li>
								<li class="font-iCielPantonBlack text-brown">Mỗi 100.000 Điểm bạn nhận được 01 Chìa khóa được hệ thống tự động quy đổi.</li>
							</ul>
							<div style={{border:'1px solid', padding:10, margin: 10}}>
								<p style={{marginBottom:5}}>Số điểm đã tích lũy: {turnsBuyInfo.accumulationPoint ? turnsBuyInfo.accumulationPoint.toLocaleString() : 0} Điểm</p>
								<p class="font-iCielPantonBlack text-brown" style={{fontWeight:'bold'}}>Cần nạp thêm tối thiểu <span class="text-red font-iCielPantonBlack" style={{color:'red'}}> {turnsBuyInfo.cardBalanceRounding ? turnsBuyInfo.cardBalanceRounding.toLocaleString(): 0} Scoin từ thẻ Scoin</span> hoặc <span class="font-iCielPantonBlack" style={{color:'red'}}>{turnsBuyInfo.scoinBalanceRounding ? turnsBuyInfo.scoinBalanceRounding.toLocaleString(): 0} Scoin từ ví </span>  để nhận 01 Chìa khóa miễn phí!</p>
								<p><a href="#" title="Thêm chìa khóa" class="font-iCielPantonLight font16" data-toggle="modal" onClick={this.openThemLuot}>Thêm Chìa khóa <img src={key_yellow_icon} width="20" class="img-fluid" /></a></p>
							</div>
						</div>
					</div>
					<h4 class="font18 font-iCielPantonLight font-weight-bold pt-3">III. Cơ cấu Giải thưởng</h4>
					<ul className='thele_3'>
						<li>Tổng số giải đặc biệt - rương báu 5 triệu Scoin: 30 giải. Mỗi ngày 01 giải. Các giải này sẽ được cộng dồn cho ngày tiếp theo, nếu không có người trúng giải ở ngày trước đó.</li>
						<li>Ngoài các giải đặc biệt, còn có rất nhiều giải Scoin khác. Tất cả giải thưởng sẽ được cộng trực tiếp vào tài khoản của game thủ.</li>
					</ul>
					
        			<p id="VinhDanh"><a href="#" title="Xem kho báu" data-toggle="modal" onClick={this.openGiaiThuong}><img src={btn_xem_kho_bau} width="150" class="img-fluid seeBonus" /></a></p>
					
				</div>
			</div>
			{/* End p2 */}

			<div class="container-fluid bang-vinh-danh-mobile mt-5">
				<h2 class="font-iCielPantonBlack text-brown-shadow text-uppercase text-center">Bảng Vinh Danh</h2>
				<ul class="nav nav-pills nav-justified pop-custom">
				<li class="nav-item">
					<a class="nav-link active px-2" data-toggle="tab" href="#doithuong" onClick={()=>this.getDataVinhDanh('highlights',1)}>Giải đặc biệt</a>
				</li>
				<li class="nav-item">
					<a class="nav-link px-2" data-toggle="tab" href="#mochu" onClick={()=>this.getDataVinhDanh('',1)}>Giải khác</a>
				</li>
				</ul> 
				<div class="tab-content">
					<div class="tab-pane container active" id="doithuong">
						<div class="table-responsive pt-3">
							<table class="table mx-auto tbl-bang-vinh-danh-mobile">
								<thead class="font18 font-iCielPantonLight font-weight-bold">
								<tr>
									<th><p class="card-text font-iCielPantonBlack text-brown-shadow font18">Tên tài khoản/Số ĐT/Thời gian trúng</p></th>
								</tr>
								</thead>
								<tbody>
									{listVinhDanh.map((obj, key) => (
											<tr key={key}>
												{(obj.itemName!=='...')?(<td><strong>{obj.userName}</strong><br />{obj.phone}<br />{obj.date}</td>):(
													<td><strong>{obj.userName}</strong> <br />{obj.phone}<br />{obj.date}</td>
												)}
												
											</tr>
										))}
								</tbody>
							</table>
							<ul class="pagination justify-content-center pag-custom mt-4">
							<Pagination
								activePage={activeVinhDanh}
								itemsCountPerPage={10}
								totalItemsCount={countVinhDanh}
								pageRangeDisplayed={numberPage}
								lastPageText={'Trang cuối'}
								firstPageText={'Trang đầu'}
								itemClass={"page-item"}
								linkClass={"page-link"}
								onChange={(v) => this.handlePageChangeVinhDanh(v)}
							/>
						</ul> 
						</div>
					</div>
					<div class="tab-pane container" id="mochu">
						<div class="table-responsive pt-3">
							<table class="table mx-auto tbl-bang-vinh-danh-mobile">
								<thead class="font18 font-iCielPantonLight font-weight-bold">
								<tr>
									<th><p class="card-text font-iCielPantonBlack text-brown-shadow font18">Tên tài khoản/Giải thưởng/Thời gian trúng</p></th>
								</tr>
								</thead>
								<tbody>
									{listVinhDanh.map((obj, key) => (
										<tr key={key}>
											{(obj.itemName!=='...')?(<td><strong>{obj.userName}</strong> <br />{obj.itemName} <img src={ruong_icons} width={20} height={20}/><br />{obj.date}</td>):(
												<td><strong>{obj.userName}</strong> <br />{obj.itemName} <br />{obj.date}</td>
											)}
											
										</tr>
									))}
								</tbody>
							</table>
							<ul class="pagination justify-content-center pag-custom mt-4">
								<Pagination
									activePage={activeVinhDanh}
									itemsCountPerPage={10}
									totalItemsCount={countVinhDanh}
									pageRangeDisplayed={numberPage}
									lastPageText={'Trang cuối'}
									firstPageText={'Trang đầu'}
									itemClass={"page-item"}
									linkClass={"page-link"}
									onChange={(v) => this.handlePageChangeVinhDanh(v)}
								/>
							</ul> 
						</div>
					</div>
				</div>
				
				
				</div>
					<div class="container-fluid bang-vinh-danh">
						<div class="container pt-5 box-bang-vinh-danh">
							<div class="mt-5 bg-bang-vinh-danh mx-auto">
								<div class="tbl-bang-vinh-danh">
									<ul class="nav nav-pills nav-justified pop-custom">
										<li class="nav-item">
											<a class="nav-link active px-2" data-toggle="tab" href="#doithuong1" onClick={()=>this.getDataVinhDanh('highlights',1)}>Giải đặc biệt</a>
										</li>
										<li class="nav-item">
											<a class="nav-link px-2" data-toggle="tab" href="#mochu1" onClick={()=>this.getDataVinhDanh('',1)}>Giải khác</a>
										</li>
									</ul> 
									<div class="tab-content">
									<div class="tab-pane container active" id="doithuong1">
										<div class="pt-3">        
											<table class="table table-borderless">
												<thead>
												<tr>
													<th class="pb-0"><p class="font-iCielPantonBlack text-brown-shadow font18 mb-0">Tên tài khoản</p></th>
													<th class="pb-0"><p class="font-iCielPantonBlack text-brown-shadow font18 mb-0">Số ĐT</p></th>
													<th class="pb-0"><p class="font-iCielPantonBlack text-brown-shadow font18 mb-0">Thời gian trúng</p></th>
												</tr>
												</thead>
												<tbody>
													{listVinhDanh.map((obj, key) => (
															<tr key={key}>
																<td className="border-right-0">{obj.userName}</td>
																<td className="border-right-0">{obj.phone}</td>
																<td className="border-left-0">{obj.date}</td>
															</tr>
														))}
												</tbody>
											</table>
													
											<ul class="pagination justify-content-center pag-custom mt-4">
												<Pagination
													activePage={activeVinhDanh}
													itemsCountPerPage={10}
													totalItemsCount={countVinhDanh}
													pageRangeDisplayed={numberPage}
													lastPageText={'Trang cuối'}
													firstPageText={'Trang đầu'}
													itemClass={"page-item"}
													linkClass={"page-link"}
													onChange={(v) => this.handlePageChangeVinhDanh(v)}
												/>
											</ul>   	
											</div>
										</div>
										<div class="tab-pane container fade" id="mochu1">
											<div class="pt-3">        
											<table class="table table-borderless">
												<thead>
												<tr>
													<th class="pb-0"><p class="font-iCielPantonBlack text-brown-shadow font18 mb-0">Tên tài khoản</p></th>
													<th class="pb-0"><p class="font-iCielPantonBlack text-brown-shadow font18 mb-0">Giải thưởng</p></th>
													<th class="pb-0"><p class="font-iCielPantonBlack text-brown-shadow font18 mb-0">Thời gian trúng</p></th>
												</tr>
												</thead>
												<tbody>
													{listVinhDanh.map((obj, key) => (
															<tr key={key}>
																<td className="border-right-0">{obj.userName}</td>
																{(obj.itemName!=='...')?(<td className="border-left-0 border-right-0">{obj.itemName} <img src={ruong_icons} width={25} height={25} /></td>):(
																	<td className="border-left-0 border-right-0">{obj.itemName}</td>
																)}
																
																<td className="border-left-0">{obj.date}</td>
															</tr>
														))}
												</tbody>
											</table>
													
											<ul class="pagination justify-content-center pag-custom mt-4">
												<Pagination
													activePage={activeVinhDanh}
													itemsCountPerPage={10}
													totalItemsCount={countVinhDanh}
													pageRangeDisplayed={numberPage}
													lastPageText={'Trang cuối'}
													firstPageText={'Trang đầu'}
													itemClass={"page-item"}
													linkClass={"page-link"}
													onChange={(v) => this.handlePageChangeVinhDanh(v)}
												/>
											</ul>   	
											</div>
										</div>
										
									</div>
								</div>
							</div>    	
						</div>
					</div>



			<div class="container-fluid footer text-center">
				<div class="container pt-3">
					<a href="https://daily.scoin.vn/huong-dan-mua-the/" title="Hướng dẫn mua thẻ" target="_blank"><img src={btn_huong_dan_mua_the} class="img-fluid img-mobile first-img" alt="Hướng dẫn mua thẻ" /></a>
					<a href="https://www.facebook.com/scoinvtcmobile/" title="Nhận thông báo sự kiện" target="_blank"><img src={btn_nhan_tb_sk} class="img-fluid img-mobile" alt="Nhận thông báo sự kiện" /></a>
					<a href="https://scoin.vn/nap-game" title="Nạp Game" target="_blank"><img src={btn_nap_scoin} class="img-fluid img-mobile" alt="Nạp Game" /></a>
					<a href="tel:19001104" title="Hotline" target="_blank"><img src={btn_hotline_hotro} class="img-fluid img-mobile" alt="Hotline" /></a>
				</div>
				<div class="container mt-5">
					<div class="logo-footer">
						<a title="VTC Mobile" target="_blank"><img src={logo_vtcmobile} width="150" alt="VTC Mobile" /></a>
						<a title="Splay" target="_blank"><img class="pl-3" src={logo_splay} width="100" alt="Splay" /></a>
						<p class="text-center pt-3 font16"><span class="text-uppercase">CÔNG TY CỔ PHẦN VTC DỊCH VỤ DI ĐỘNG</span> <br />VTC Mobile - Thành viên của Tổng Công ty Truyền thông đa phương tiện Viêt Nam VTC <br /> Tầng 11, tòa nhà VTC Online, số 18 Tam Trinh, phường Minh Khai, quận Hai Bà Trưng, Hà Nội.
			<br />Tel: (84-4).39877470 <br />Fax: 84-4).39877210<br /> <a href="mailto:vtcmobile@vtc.vn">vtcmobile@vtc.vn</a>
				</p>
					</div>
				</div>
			</div>

			{/* The Modal Phần thưởng */}
			<div class="modal fade" data-keyboard="false" data-backdrop="static" id="GiaiThuong">
				<div class="modal-dialog">
					<div class="modal-content bg-modal-content border-0" style={{marginTop: 60}}>
					<div class="modal-header border-bottom-0">
						<h4 class="modal-title"><img src={header_giaithuong} class="img-fluid header-giaithuong" /></h4>
						<button type="button" class="close" data-dismiss="modal"><img src={close_icon} class="img-fluid" /></button>
					</div>
					<div class="modal-body font16">
						{/* <p class="d-pc-none mt-n3">&rarr; Trả thẳng vào Ví Scoin của khách hàng</p> */}

						{listCountBonus.map((obj, key) => (
							<div class="alert alert-giaithuong row mx-0 py-0 pl-0 mb-2" key={key}>
								<div class="col-md-2 col-6 pl-0">
									<img src={ruong_icon} class="img-fluid" />
								</div>
								<div class="col-md-3 col-6 px-1 text-center pt-3">
									{this.getNameScoin(obj.itemName)} <img src={logo_scoin} width="60" class="img-fluid" /> <br /> <span class="font-italic d-pc-none">Còn {obj.itemQuantityExist ? obj.itemQuantityExist.toLocaleString() :0} giải</span>
								</div>
								<div class="col-md-2 px-1 d-mobile-none text-center pt-3">
									Còn {obj.itemQuantityExist ? obj.itemQuantityExist.toLocaleString() :0} giải
								</div>
								<div class="col-md-5 px-1 d-mobile-none text-center pt-3">
									Trả thẳng vào Ví Scoin của khách hàng
								</div>
							</div>
						))}
					</div>

					</div>
				</div>
			</div>

			{/* The Modal them luot */}
			<div class="modal fade" id="ThemLuot" style={{zIndex:10001}}>
				<div class="modal-dialog">
					<div class="modal-content bg-modal-content border-0">
						<div class="modal-header border-bottom-0">
							<button type="button" class="close" data-dismiss="modal"><img src={close_icon} class="img-fluid" /></button>
						</div>
						<div class="modal-body font16">
							<div class="w-75 mx-auto">
								<p class="font-iCielPantonBlack text-brown pt-5">Bạn muốn nhận thêm Chìa khóa mở rương báu Scoin?</p>
								<ul>
									<li class="font-iCielPantonBlack text-brown">Mỗi 1 Scoin bạn nạp vào game từ Thẻ Scoin sẽ nhận được 2 Điểm</li>
									<li class="font-iCielPantonBlack text-brown">Mỗi 1 Scoin bạn nạp vào game từ ví Scoin sẽ nhận được 1 Điểm.</li>
									<li class="font-iCielPantonBlack text-brown">Mỗi 100.000 Điểm bạn nhận được 01 Chìa khóa được hệ thống tự động quy đổi.</li>
								</ul>				
								<p class="font-iCielPantonBlack text-brown">(không giới hạn giá trị nạp & số lần nạp)</p>
								<div class="alert alert-giaithuong">
									<p class="font-iCielPantonBlack text-brown">Số điểm đã tích lũy: <span class="text-dark font-iCielPantonBlack">{turnsBuyInfo.accumulationPoint ? turnsBuyInfo.accumulationPoint.toLocaleString() : 0} Điểm</span></p>	
									<p class="font-iCielPantonBlack text-brown" style={{fontWeight:'bold'}}>Cần nạp thêm tối thiểu <span class="text-red font-iCielPantonBlack" style={{color:'red'}}> {turnsBuyInfo.cardBalanceRounding ? turnsBuyInfo.cardBalanceRounding.toLocaleString(): 0} Scoin từ thẻ Scoin</span> hoặc <span class="font-iCielPantonBlack" style={{color:'red'}}>{turnsBuyInfo.scoinBalanceRounding ? turnsBuyInfo.scoinBalanceRounding.toLocaleString(): 0} Scoin từ ví </span>  để nhận 01 Chìa khóa miễn phí!</p>
								</div>
								<p class="text-center w-75 mx-auto mt-4 mb-0"><a href="https://scoin.vn/nap-game" title="Nạp Game" target="_blank"><img src={btn_nap_game} class="img-fluid napGame" /></a></p>
							</div>
						</div>	  
					</div>
				</div>
			</div>

			{/* The Modal chia khoa */}
			<div class="modal fade" id="MuaChiaKhoa" style={{zIndex:10002}}>
				<div class="modal-dialog">
					<div class="modal-content bg-modal-content border-0">
						<div class="modal-header border-bottom-0">
							<button type="button" class="close" data-dismiss="modal"><img src={close_icon} class="img-fluid" /></button>
						</div>
						<div class="modal-body">
							<p class="font-iCielPantonBlack text-brown pt-3">Mua chìa khóa bằng thẻ Scoin các mệnh giá:</p>
							<p class="font-iCielPantonBlack font16 text-center my-2">Thẻ Scoin 10k > 1 Chìa khóa <img src={key_yellow_icon} width="20" class="img-fluid" /></p>
							<p class="font-iCielPantonBlack font16 text-center my-2">Thẻ Scoin 20k > 2 Chìa khóa <img src={key_yellow_icon} width="20" class="img-fluid" /> </p>
							<p class="font-iCielPantonBlack font16 text-center my-2">Thẻ Scoin 50k > 5 Chìa khóa <img src={key_yellow_icon} width="20" class="img-fluid" /></p>
							<div class="alert alert-giaithuong font16 mt-4">
								<div class="row">
									<div class="col-7 px-2">
									<p class="m-0 font-iCielPantonBlack text-brown">Hôm nay có thể mua:</p>
									</div>
									<div class="col-5 px-1 text-right">
										<p class="p-0 m-0"><span class="font-iCielPantonBlack text-dark">{turnsBuyInfo.turnCanBuy} Chìa khóa</span> <img src={key_yellow_icon} width="20" class="img-fluid" /></p>
									</div> 
								</div>           
							</div>        
							<div class="mx-auto pt-2">
								<p style={{color:'red', textAlign:"center", marginBottom:10}}>Khi mua vượt quá giới hạn trong ngày, Scoin thừa sẽ được cộng vào ví</p>
								<p class="text-center w-50 mx-auto mt-3"><a href="https://scoin.vn/nap-vao-game?GameId=330335" target="_blank" title="Xác nhận mua"><img src={btn_xac_nhan_mua} class="img-fluid xacNhan" /></a></p>
							</div>
						</div>	  
					</div>
				</div>
				</div>
			


			{/* The Modal Lich su */}
			<div class="modal fade" id="LichSu" data-keyboard="false" data-backdrop="static" style={{zIndex:100001}}>
				<div class="modal-dialog">
					<div class="modal-content bg-modal-content border-0">
					<div class="modal-header border-bottom-0">
						<button type="button" class="close" data-dismiss="modal"><img src={close_icon} class="img-fluid" /></button>
					</div>
					<div class="modal-body">
						<h2 class="font-iCielPantonBlack text-brown-shadow text-uppercase text-center pb-0">Lịch Sử</h2>
						<div class="">
							<ul class="nav nav-pills nav-justified pop-custom">
								<li class="nav-item">
									<a class="nav-link active font16 px-2" data-toggle="tab" href="#TGiaiThuong" onClick={this.getBonus}>Giải thưởng</a>
								</li>
								<li class="nav-item">
									<a class="nav-link font16 px-2" data-toggle="tab" href="#TMoRuong" onClick={()=>this.getRuong(user,activeRuong)}>Mở Rương</a>
								</li>
								<li class="nav-item">
									<a class="nav-link font16 px-2" data-toggle="tab" href="#TNhanChiaKhoa" onClick={()=>this.getKey(user,activeKey)}>Nhận chìa khóa</a>
								</li>
							</ul>
							<div class="tab-content">
							<div class="tab-pane container active" id="TGiaiThuong">
								<div class="d-pc-none pt-3">
									<table class="table mx-auto tbl-bang-vinh-danh-mobile text-center">
										<thead class="font-iCielPantonLight font-weight-bold">
										<tr>
											<th><p class="card-text font-iCielPantonBlack text-brown-shadow font16">STT/Nội dung/Thời gian trúng</p></th>
										</tr>
										</thead>
										<tbody>
											{listCodeBonus.map((obj, key) => (
												<tr key={key}>
													<td class="font16"><strong>{key + (activeBonus-1)*limit +1}</strong> <br />{obj.itemName}<br />{obj.date}</td>
												</tr>
											))}
										</tbody>
									</table>
									<ul class="pagination justify-content-center pag-custom mt-4">
										<Pagination
											activePage={activeBonus}
											itemsCountPerPage={5}
											totalItemsCount={countCodeBonus}
											pageRangeDisplayed={numberPage}
											lastPageText={'Trang cuối'}
											firstPageText={'Trang đầu'}
											itemClass={"page-item"}
											linkClass={"page-link"}
											onChange={(v) => this.handlePageChangeCodeBonus(v)}
										/>
									</ul> 
								</div>
								<div class="table-responsive d-mobile-none">
									<table class="table table-borderless text-center mb-2">
										<thead>
										<tr>
											<th><p class="font-iCielPantonBlack text-brown-shadow font18 mb-0">STT</p></th>
											<th><p class="font-iCielPantonBlack text-brown-shadow font18 mb-0">Nội dung</p></th>
											<th><p class="font-iCielPantonBlack text-brown-shadow font18 mb-0">Thời gian trúng</p></th>
										</tr>
										</thead>
										<tbody>
											{listCodeBonus.map((obj, key) => (
												<tr key={key}>
													<td className="border-right-0">{key + (activeBonus-1)*limit +1}</td>
													<td className="border-left-0 border-right-0">{obj.itemName}</td>
													<td className="border-left-0">{obj.date}</td>
												</tr>
											))}

										</tbody>
									</table>
								
									<ul class="pagination justify-content-center pag-custom">
										<Pagination
											activePage={activeBonus}
											itemsCountPerPage={10}
											totalItemsCount={countCodeBonus}
											pageRangeDisplayed={numberPage}
											lastPageText={'Trang cuối'}
											firstPageText={'Trang đầu'}
											itemClass={"page-item"}
											linkClass={"page-link"}
											onChange={(v) => this.handlePageChangeCodeBonus(v)}
										/>
									</ul>
								</div> 
							</div>
							<div class="tab-pane container fade" id="TMoRuong">
								<div class="d-pc-none pt-3">
									<table class="table mx-auto tbl-bang-vinh-danh-mobile text-center">
										<thead class="font-iCielPantonLight font-weight-bold">
										<tr>
											<th><p class="card-text font-iCielPantonBlack text-brown-shadow font16">STT/Kết quả/Thời gian</p></th>
										</tr>
										</thead>
										<tbody>
											{listRuong.map((obj, key) => (
												<tr key={key}>
													<td class="font16"><strong>{obj.stt}</strong> <br />{obj.item_name}<br />{obj.date}</td>
												</tr>
											))}
										
										</tbody>
									</table>
									<ul class="pagination justify-content-center pag-custom mt-4">
										<Pagination
											activePage={activeRuong}
											itemsCountPerPage={5}
											totalItemsCount={countRuong}
											pageRangeDisplayed={numberPage}
											lastPageText={'Trang cuối'}
											firstPageText={'Trang đầu'}
											itemClass={"page-item"}
											linkClass={"page-link"}
											onChange={(v) => this.handlePageChangeRuong(v)}
										/>
									</ul> 
								</div>
								<div class="table-responsive d-mobile-none">
									<table class="table table-borderless text-center mb-2">
										<thead>
										<tr>
											<th><p class="font-iCielPantonBlack text-brown-shadow font18 mb-0">STT</p></th>
											<th><p class="font-iCielPantonBlack text-brown-shadow font18 mb-0">Kết quả</p></th>
											<th><p class="font-iCielPantonBlack text-brown-shadow font18 mb-0">Thời gian</p></th>
										</tr>
										</thead>
										<tbody>
											{listRuong.map((obj, key) => (
												<tr key={key}>
													<td className="border-right-0">{obj.stt}</td>
													<td className="border-left-0 border-right-0">{obj.item_name}</td>
													<td className="border-left-0">{obj.date}</td>
												</tr>
											))}
										</tbody>
									</table>
								
								<ul class="pagination justify-content-center pag-custom">
									<Pagination
										activePage={activeRuong}
										itemsCountPerPage={10}
										totalItemsCount={countRuong}
										pageRangeDisplayed={numberPage}
										lastPageText={'Trang cuối'}
										firstPageText={'Trang đầu'}
										itemClass={"page-item"}
										linkClass={"page-link"}
										onChange={(v) => this.handlePageChangeRuong(v)}
									/>
								</ul>
								</div>
							</div>
							<div class="tab-pane container fade" id="TNhanChiaKhoa">
								<div class="d-pc-none pt-3">
									<table class="table mx-auto tbl-bang-vinh-danh-mobile text-center">
										<thead class="font-iCielPantonLight font-weight-bold">
										<tr>
											<th><p class="card-text font-iCielPantonBlack text-brown-shadow font16">Nội Dung/Số lượng/Thời gian</p></th>
										</tr>
										</thead>
										<tbody>
											{listKey.map((obj, key) => (
												<tr key={key}>
													<td class="font16"><strong>{obj.sourceTurn}</strong> <br />{obj.receivedTurn} <img src={key_yellow_icon} width="20" class="img-fluid" /><br />{obj.date}</td>
												</tr>
											))}
										
										</tbody>
									</table>
									<ul class="pagination justify-content-center pag-custom mt-4">
										<Pagination
											activePage={activeKey}
											itemsCountPerPage={5}
											totalItemsCount={countKey}
											pageRangeDisplayed={numberPage}
											lastPageText={'Trang cuối'}
											firstPageText={'Trang đầu'}
											itemClass={"page-item"}
											linkClass={"page-link"}
											onChange={(v) => this.handlePageChangeKey(v)}
										/>
									</ul> 
								</div>
								<div class="table-responsive d-mobile-none">
									<table class="table table-borderless text-center mb-2">
										<thead>
										<tr>
											<th><p class="font-iCielPantonBlack text-brown-shadow font18 mb-0">Nội Dung</p></th>
											<th><p class="font-iCielPantonBlack text-brown-shadow font18 mb-0">Số lượng</p></th>
											<th><p class="font-iCielPantonBlack text-brown-shadow font18 mb-0">Thời gian</p></th>
										</tr>
										</thead>
										<tbody>
											{listKey.map((obj, key) => (
												<tr key={key}>
													<td className="border-right-0">{obj.sourceTurn}</td>
													<td className="border-left-0 border-right-0">{obj.receivedTurn} <img src={key_yellow_icon} width="20" class="img-fluid" /></td>
													<td className="border-left-0">{obj.date}</td>
												</tr>
											))}
										</tbody>
									</table>
								
								<ul class="pagination justify-content-center pag-custom">
									<Pagination
										activePage={activeKey}
										itemsCountPerPage={10}
										totalItemsCount={countKey}
										pageRangeDisplayed={numberPage}
										lastPageText={'Trang cuối'}
										firstPageText={'Trang đầu'}
										itemClass={"page-item"}
										linkClass={"page-link"}
										onChange={(v) => this.handlePageChangeKey(v)}
									/>
								</ul>
								</div>
							</div>
							</div>
						</div>
						
					</div>	  
					</div>
				</div>
				</div>
			{/* The Modal Thông báo chúc mừng */}
			<div className="modal" id="myModal4">
			<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">
						<div className="modal-header border-bottom-0">	
							<button type="button" className="close" data-dismiss="modal"><img src={close_icon} alt="Đóng" class="img-fluid"/></button>
						</div>
						<div className="modal-body">
						<h2 class="font-iCielPantonBlack text-brown-shadow text-uppercase text-center pb-0 w-75 mx-auto mt-n5">Chúc mừng</h2>
							<div className="mt-2 text-center">              
								<h5 className="text-thele lead text-center py-3">Bạn vừa tìm được <span style={{color:'red'}}>{itemBonus.name}</span> khi mở rương!</h5>
								<h5 className="text-thele lead text-center py-3">(Phần thưởng đã được cộng trực tiếp vào ví Scoin.vn)</h5>
								<span className="text-center">Xem <a className="underline" style={{color:"#2d9bf0", cursor:'pointer'}} onClick={()=>this.showModalCodeBonus(1)}>Lịch sử</a></span><br></br>
								<button type="button" className="btn mx-auto text-center my-3" style={{backgroundColor:'#1ac6ff', color:'#fff'}} onClick={this.closeModal4}>Mở tiếp 1 rương</button>
							</div>       
						</div>

					</div>
				</div>
			</div>

			{/* <!-- The Modal Thông báo đăng nhập--> */}
			<div className="modal fade" id="myModal5">
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">


					<div className="modal-header border-bottom-0">
						
						<button type="button" className="close" data-dismiss="modal"><img src={close_icon} alt="Đóng" class="img-fluid"/></button>
					</div>

					<div className="modal-body">
					<h2 class="font-iCielPantonBlack text-brown-shadow text-uppercase text-center pb-0 w-75 mx-auto mt-n5">Thông Báo</h2>
						<div className="mt-2 text-center">              
							<h5 className="text-thele lead text-center py-3">Xin vui lòng đăng nhập!</h5>
							<button type="button" className="btn btn-danger mx-auto text-center my-3" onClick={this.loginAction}>Đăng nhập</button>
						</div>       
					</div>

					</div>
				</div>
			</div>

			{/* <!-- The Modal Thông báo hết lượt--> */}
			<div class="modal fade" id="myModal6" style={{zIndex:10001}}>
				<div class="modal-dialog">
					<div class="modal-content bg-modal-content border-0">
					<div class="modal-header border-bottom-0">
						<button type="button" class="close" data-dismiss="modal"><img src={close_icon} class="img-fluid" /></button>
					</div>
					<div class="modal-body font16">
						<div class="w-75 mx-auto">
							<h3 class="font-iCielPantonBlack text-brown pt-5">HẾT CHÌA KHÓA</h3>
							<ul>
								<li class="font-iCielPantonBlack text-brown">Mỗi 1 Scoin bạn nạp vào game từ Thẻ Scoin sẽ nhận được 2 Điểm</li>
								<li class="font-iCielPantonBlack text-brown">Mỗi 1 Scoin bạn nạp vào game từ ví Scoin sẽ nhận được 1 Điểm.</li>
								<li class="font-iCielPantonBlack text-brown">Mỗi 100.000 Điểm bạn nhận được 01 Chìa khóa được hệ thống tự động quy đổi.</li>
							</ul>				
							<p class="font-iCielPantonBlack text-brown">(không giới hạn giá trị nạp & số lần nạp)</p>
							<div class="alert alert-giaithuong">
								<p class="font-iCielPantonBlack text-brown">Số điểm đã tích lũy: <span class="text-dark font-iCielPantonBlack">{turnsBuyInfo.accumulationPoint ? turnsBuyInfo.accumulationPoint.toLocaleString() : 0} Điểm</span></p>	
								<p class="font-iCielPantonBlack text-brown" style={{fontWeight:'bold'}}>Cần nạp thêm tối thiểu <span class="text-red font-iCielPantonBlack" style={{color:'red'}}> {turnsBuyInfo.cardBalanceRounding ? turnsBuyInfo.cardBalanceRounding.toLocaleString(): 0} Scoin từ thẻ Scoin</span> hoặc <span class="font-iCielPantonBlack" style={{color:'red'}}>{turnsBuyInfo.scoinBalanceRounding ? turnsBuyInfo.scoinBalanceRounding.toLocaleString(): 0} Scoin từ ví </span>  để nhận 01 Chìa khóa miễn phí!</p>
							</div>
							<p class="text-center w-75 mx-auto mt-4 mb-0"><a href="https://scoin.vn/nap-game" title="Nạp Game" target="_blank"><img src={btn_nap_game} class="img-fluid napGame" /></a></p>
						</div>
					</div>	  
					</div>
				</div>
			</div>


			{/* <!-- The Modal Rương rỗng--> */}
			<div className="modal fade" id="myModal7">
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">


					<div className="modal-header border-bottom-0">
						
						<button type="button" className="close" data-dismiss="modal"><img src={close_icon} alt="Đóng" class="img-fluid"/></button>
					</div>

					<div className="modal-body">
						{/* <h2 class="font-iCielPantonBlack text-brown-shadow text-uppercase text-center pb-0 w-75 mx-auto mt-n5">Thông Báo</h2> */}
						<div className="mt-2 text-center">
							<h5 className="text-thele lead text-center py-2">Rương rỗng...</h5>              
							<h5 className="text-thele lead text-center py-3">Chúc bạn may mắn lần sau</h5>
							<button type="button" className="btn mx-auto text-center my-3" style={{backgroundColor:'#1ac6ff', color:'#fff'}} onClick={this.closeModal7}>Mở tiếp 1 rương</button>
						</div>       
					</div>

					</div>
				</div>
			</div>

			{/* <!-- The Modal Kho bau--> */}
			<div className="modal fade" id="Khobau" >
				<div className="modal-dialog">
					<div className="modal-content  bg-transparent border-0 center-screen">


					<div className="modal-body text-center">
						<img src={khobau} class="img-khobau" />
					</div>

					</div>
				</div>
			</div>

			{/* <!-- The Modal Xác thực sdt--> */}
			<div className="modal fade" id="myModal8">
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					{/* <!-- Modal Header --> */}
					<div className="modal-header border-bottom-0">
						<button type="button" className="close" data-dismiss="modal"><img src={close_icon} alt="Đóng"  class="img-fluid"/></button>
					</div>

					{/* <!-- Modal body --> */}
					<div className="modal-body">
						<h2 class="font-iCielPantonBlack text-brown-shadow text-uppercase text-center pb-0 w-75 mx-auto mt-n5">Thông Báo</h2>
						<div className="table-responsive mt-2">              
							<h5 className="text-thele lead text-center">{message_status}</h5>
							{(xacthuc)?(<button type="button" className="btn btn-xacnhan text-white btn-block text-center py-4" onClick={()=>this.xacThuc('https://scoin.vn/cap-nhat-sdt')}>Xác Thực</button>):(<div></div>)}
							
						</div>       
					</div>

					</div>
				</div>
			</div>
			{/* <!-- The Modal Kết quả quay tự động--> */}

			<div className="modal fade" id="myModal9" data-keyboard="false" data-backdrop="static" style={{zIndex:10000}}>
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					<div className="modal-header border-bottom-0">
						<button className="close"><img src={close_icon} alt="Đóng" onClick={this.closePopupAuto} class="img-fluid"/></button>
					</div>

					<div className="modal-body">
						<h2 class="font-iCielPantonBlack text-brown-shadow text-uppercase text-center pb-0 w-75 mx-auto mt-n5">Kết quả mở rương báu tự động</h2>
						<div id="auto" className="table-responsive mt-2" style={{height:300}}>
							<ol className="list-group list-group-flush">
								{data_auto.map((obj, key) => (
									<li className="list-group-item" key={key}>{key+1}. {obj}</li>
								))}
							</ol> 
						
						</div>
						<p className="text-thele">Vào <code style={{color:'red'}}><label style={{cursor:'pointer'}} onClick={()=>this.showModalCodeBonus(1)}>Lịch sử</label></code> để xem chi tiết.</p>
						{(textAuto)?(<p className="text-thele text-center"><code style={{color:'red'}} className="font-iCielPantonBlack">Đang mở tự động <span className="spinner-grow spinner-grow-sm"></span></code></p>):(
							<p className="text-thele text-center font-iCielPantonBlack" style={{color:'red'}}>Đã dùng hết Chìa khóa</p>
						)}
						
						
					</div>

					</div>
				</div>
			</div>

			{/* <!-- The Modal báo lỗi--> */}
			<div className="modal fade" id="myModal11">
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					{/* <!-- Modal Header --> */}
					<div className="modal-header border-bottom-0">
						<h2 class="font-iCielPantonBlack text-brown-shadow text-uppercase text-center pb-0 w-75 mx-auto mt-n5">Thông Báo</h2>
						<button type="button" className="close" data-dismiss="modal"><img src={close_icon} alt="Đóng" class="img-fluid"/></button>
					</div>

					{/* <!-- Modal body --> */}
					<div className="modal-body">
						<div className="table-responsive mt-2">              
							<h5 className="text-thele lead text-center">{message_error}</h5>
						</div>       
					</div>

					</div>
				</div>
			</div>
			<div className="modal fade" id="myModal12">
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					{/* <!-- Modal Header --> */}
					<div className="modal-header border-bottom-0">
						
						<button type="button" className="close" data-dismiss="modal"><img src={close_icon} alt="Đóng" /></button>
					</div>

					{/* <!-- Modal body --> */}
					<div className="modal-body">
					<h2 class="font-iCielPantonBlack text-brown-shadow text-uppercase text-center pb-0 w-75 mx-auto mt-n5">Thông Báo</h2>
						<div className="mt-2 text-center">              
							<h5 className="text-thele lead text-center">Thông báo bảo trì!</h5>
							<h5 className="text-thele lead text-center">Hệ thống đang được nâng cấp để tối ưu. Vui lòng quay lại sau 10 phút.</h5>
							<h5 className="text-thele lead text-center">Xin lỗi vì sự bất tiện này</h5>
							<button type="button" className="btn btn-danger mx-auto text-center my-3" onClick={this.closeServerErr}>Xác nhận</button>
						</div>       
					</div>

					</div>
				</div>
			</div>

			<div className="modal fade" id="myModal13">
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					{/* <!-- Modal Header --> */}
					<div className="modal-header border-bottom-0">
						<h2 class="font-iCielPantonBlack text-brown-shadow text-uppercase text-center pb-0">Thông Báo</h2>
						<button type="button" className="close" data-dismiss="modal"><img src={close_icon} alt="Đóng" /></button>
					</div>

					{/* <!-- Modal body --> */}
					<div className="modal-body">
						<div className="table-responsive mt-2"> 
							<h3 class="text-center text-red">Livestream chưa diễn ra.</h3>          
							<h5 className="text-thele lead text-center">Mời quay lại vào lúc 19:00 ngày 04/11/2019 để xem trực tiếp buổi so Mã dự thưởng trúng iPhone 11 Pro Max 256Gb</h5>
							<p class="text-center text-thele">Phát sóng trực tiếp tại trang sự kiện <a style={{color:'#0066ff', textDecoration:'underline'}}>https://vongquayt10.splay.vn</a></p>
							<p class="text-center text-thele">Và fanpage Scoin: <a href="https://www.facebook.com/scoinvtcmobile" title="Fanpage Scoin" target="_blank">https://www.facebook.com/scoinvtcmobile</a></p>
							<h5 className="text-thele lead text-center">BTC trân trọng thông báo.</h5>
							<button type="button" className="btn btn-xacnhan text-white btn-block text-center py-4" onClick={this.closePopupFinish}>Xác nhận</button>
						</div>       
					</div>

					</div>
				</div>
			</div>
			<ReactResizeDetector handleWidth={true} handleHeight={true} onResize={this.onResize} />


		</div>)
	}
}

const mapStateToProps = state => ({
	dataProfile: state.profile.data,
	dataRotation:state.lucky.dataRotation,
	dataRotationWithUser:state.lucky.dataRotationWithUser,
	dataPick: state.lucky.dataPick,
	dataDetail: state.lucky.dataDetail,
	dataTurn: state.lucky.dataTurn,
	dataTuDo: state.lucky.dataTuDo,
	dataListKey: state.lucky.dataListKey,
	dataCountBonus:state.lucky.dataCountBonus,
	dataHistoryTuDo: state.lucky.dataHistoryTuDo,
	dataVinhDanh: state.lucky.dataVinhDanh,
	dataCodeBonus: state.lucky.dataCodeBonus,
	server:state.server.serverError,
	waiting: state.lucky.waiting,
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getDetailData,
	getRotationDetailData,
	getRotationDetailDataUser,
	getCountBonus,
	pickCard,
	buyTurn,
	getHistoryTuDo,
	getData,
	getTuDo,
	getCodeBonus,
	getVinhDanh,
	getKeys,
}, dispatch)


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Lucky_Rotation)