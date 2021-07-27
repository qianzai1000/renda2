import r from './request.js'

export const login = (data) => {
	return r({
		url: '/api/wechatApi/login',
		method: 'post',
    data,
    unNeedLogin: true
	})
}

export const saveWxInfo = (data) => {
  return r({
    url: '/api/wechatApi/saveWxInfo',
    method: 'post',
    data
  })
}

export const saveUserProfile = (data) => {
  return r({
    url: '/api/wechatApi/saveUserProfile',
    method: 'post',
    data
  })
}
