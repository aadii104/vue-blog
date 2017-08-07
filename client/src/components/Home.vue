<template>
    <div style="width: 100%; min-height: 100%;" class="font-style">
        <el-menu mode="horizontal" @select="handleSelect" :default-active="'dashboard'">
            <el-menu-item index="logo" style="font-size: 30px" class="brand-logo">
                profile
            </el-menu-item>
            <el-menu-item index="logout" style="float: right">Logout</el-menu-item>
        </el-menu>
        <br />
        <transition name="fade">
            <router-view @validation-failed="handleSelect"></router-view>
        </transition>
        <transition name="fade">
            <i v-if="displayCaret" class="page-fixed-component el-icon-caret-top" onclick="window.scroll({ top: 0, left: 0, behavior: 'smooth' });"></i>
        </transition>
    </div>
</template>


<script>
    import {
        mapMutations,
        mapGetters
    } from 'vuex';

    export default {
        data() {
            return {
                navigation: ['sources', 'favourites'],
                displayCaret: false
            };
        },
        created() {
            window.document.addEventListener('scroll', this.handleScroll);
        },
        mounted() {
            window.document.title = `${this.formatUsername()}'s profile`;
        },
        destroyed() {
            window.document.addEventListener('scroll', this.handleScroll);
        },
        methods: {
            ...mapMutations([
                'removeUser'
            ]),
            ...mapGetters([
                'formatUsername'
            ]),
            handleSelect(key) {
                switch (key) {
                    case 'logout':
                        this.removeUser();
                        this.$router.push({
                            path: '/'
                        });
                        break;
                    default:
                        this.$router.push({
                            path: '/profiles'
                        });
                        break;
                }
            }
        }
    };

</script>