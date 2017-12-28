<template>
  <div>
    <el-table
      :data = "questionsList"
      border
      style="width: 100%">
      <el-table-column
        prop="questionId"
        label="题目ID"
        width="120">
      </el-table-column>
      <el-table-column
        prop="questionLevel"
        label="等级"
        width="120">
      </el-table-column>
      <el-table-column
        prop="questionUnit"
        label="单元"
        width="120">
      </el-table-column>
      <el-table-column
        prop="questionTitle"
        label="题目标题"
        width="300">
      </el-table-column>
      <el-table-column
        prop="correctAnswer"
        label="正确答案"
        width="120">
      </el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="Pagination" style="text-align: left;margin-top: 10px;">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="count">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        questionsList: [],
        count: 0,
        currentPage: 1,
        pageSize: 10
      }
    },
    mounted () {
      this._initData()
    },
    methods: {
      handleClick (row) {
        console.log(row)
      },
      handleCurrentChange (val) {
        this.currentPage = val
        // this.offset = (val - 1)*this.limit;
        this._initData()
      },
      _initData () {
        let param = {
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }

        axios.get('http://localhost:3000/questions/num').then((response) => {
          let res = response.data
          if (res.status === '0') {
            this.count = res.result.count
          }
        })

        axios.get('http://localhost:3000/questions/show', {
          params: param
        })
        .then((response) => {
          let res = response.data
          if (res.status === '0') {
            this.questionsList = res.result.list
          } else {
            this.questionsList = []
          }
        })
      }
    }
  }
</script>