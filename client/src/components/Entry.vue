<template>
    <div style="width: 100%; min-height: 100%">

        <el-col :gutter="10" :xs="10" :sm="10" :md="10" :lg="10">
            <el-tabs>
                <el-tab-pane label="Login">
                    <el-form label-width="120px" class="custom-padding" :rules="rules" :model="user" ref="loginForm">
                        <el-row>
                            <el-col :span="6">
                                <div style="float: left; margin-top: 7px">Username:</div>
                            </el-col>
                            <el-col :span="18">
                                <el-form-item prop="username">
                                    <el-input v-model="user.username" required></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">
                                <div style="float: left; margin-top: 7px">Password:</div>
                            </el-col>
                            <el-col :span="18">
                                <el-form-item prop="password">
                                    <el-input v-model="user.password" type="password" required></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <el-button type="primary" @click="loginUser">
                                    Login
                                </el-button>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="Register">
                    <el-form label-width="120px" class="custom-padding" :rules="rules" :model="user" ref="registrationForm">
                        <el-row>
                            <el-col :span="6">
                                <div style="float: left; margin-top: 7px">Username:</div>
                            </el-col>
                            <el-col :span="18">
                                <el-form-item prop="username">
                                    <el-input v-model="user.username" required></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">
                                <div style="float: left; margin-top: 7px">Password:</div>
                            </el-col>
                            <el-col :span="18">
                                <el-form-item prop="password">
                                    <el-input v-model="user.password" type="password" required></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">
                                <div style="float: left; margin-top: 7px">Re Password:</div>
                            </el-col>
                            <el-col :span="18">
                                <el-form-item prop="password2">
                                    <el-input v-model="user.password2" type="password" required></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col>
                                <el-button type="primary" @click="addUser">
                                    Register
                                </el-button>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </el-col>
        </el-row>
    </div>
</template>


<script>
    import {
        mapMutations
    } from 'vuex';
    import {
        handleError,
        displayMessage,
        loginUser,
        addUser
    } from './../api/api';

    export default {
        data() {
            return {
                user: {
                    username: '',
                    password: '',
                    password2: ''
                },
                rules: {
                    username: [{
                        required: true,
                        message: 'Please enter the username',
                        trigger: 'blur'
                    },
                    {
                        min: 5,
                        max: 20,
                        message: 'Length should be between 5 and 20',
                        trigger: 'change'
                    }
                    ],
                    password: [{
                        required: true,
                        message: 'Please enter the password',
                        trigger: 'blur'
                    },
                    {
                        min: 8,
                        message: 'Length should be 8 and greater',
                        trigger: 'change'
                    }
                    ],
                    password2: [{
                        required: true,
                        message: 'Please re-enter the password',
                        trigger: 'blur'
                    },
                    {
                        min: 8,
                        message: 'Length should be 8 and greater',
                        trigger: 'change'
                    }
                    ]
                }
            };
        },
        mounted() {
            window.document.title = 'Zira  ;-)';
        },
        methods: {
            ...mapMutations([
                'setUser'
            ]),
            loginUser() {
                let username = this.user.username;
                let password = this.user.password;

                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        loginUser({
                            username: username,
                            password: password
                        })
                            .then((data) => {
                                if (data.success) {
                                    this.setUser({
                                        username: username,
                                        token: data.token
                                    });
                                    this.$router.push({
                                        path: 'home'
                                    });
                                } else
                                    handleError(null, data.message);
                            });
                    } else
                        handleError(null, 'Form fields not valid');

                });
            },
            addUser() {
                let username = this.user.username;
                let password = this.user.password;
                let password2 = this.user.password2;

                this.$refs.registrationForm.validate((valid) => {
                    if (valid) {
                        addUser({
                            username: username,
                            password: password,
                            password2: password2
                        })
                            .then((data) => {
                                if (data.success)
                                    displayMessage(`User registration successful.` +
                                        ` Please login to continue...`);
                                else
                                    handleError(null, data.message);
                            });
                    } else
                        handleError(null, 'Form fields not valid');
                });
            }
        }
    };

</script>


<style scoped>

</style>