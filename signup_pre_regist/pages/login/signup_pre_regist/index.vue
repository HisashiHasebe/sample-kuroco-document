<template>
    <div>
        <div v-if="!presignupDone">
            <form @submit.prevent="signup">
                <p v-if="error" :style="{ color: 'red' }">
                    {{ error }}
                </p>

                <div>
                    <label>name1</label>
                    <input v-model="user.name1" name="name1" type="text" placeholder="name1">
                </div>
                <div>
                    <label>name2</label>
                    <input v-model="user.name2" name="name2" type="text" placeholder="name2">
                </div>
                <div>
                    <label>email</label>
                    <input v-model="email" name="email" type="email" placeholder="email">
                </div>
                <div>
                    <label>login_pwd</label>
                    <input v-model="user.login_pwd" name="login_pwd" type="password" placeholder="login_pwd">
                </div>

                <div>
                    <button type="submit">
                        サインアップ
                    </button>
                </div>
            </form>
        </div>
        <div v-else-if="presignupDone">
            仮登録が完了しました。メールをご確認ください。
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            presignupDone: false,
            email: null,
            user: {},
            error: null
        }
    },
    methods: {
        async signup() {
            try {
                const payload = {
                    email: this.email,
                    ext_info: {
                        ...this.user
                    },
                }
                // post data
                // 新規会員登録のリクエスト
                await this.$axios.$post('/rcms-api/13/member/invite', payload)
                this.presignupDone = true
            } catch (e) {
                console.error(e)
                this.error = 'エラーが発生しました。'
            }
        },
    },
}
</script>

<style scoped>
form>div {
    margin: 8px;
    display: flex;
    flex-direction: row;
}

form>div>* {
    display: flex;
    flex-direction: row;
    flex-basis: 100px;
}

form>div>*:nth-child(1) {
    flex: 0 0 100px;
    padding-right: 8px;
}

form>div>*:nth-child(2) {
    min-width: 0;
    flex: 1 100 auto;
}
</style>