<template>
  <div class="demo">
    <SopBasicInfo title="标题" />
  </div>

  <div class="demo">
    <SopBasicInfo title="xxx合同">
      <template #default>
        <span>
          <ElTag type="danger" size="small">
            存在手动终止记录
          </ElTag>
        </span>
        <span>
          <SopStatus type="danger" text="未过审" />
        </span>
        <span>
          创建时间：2022-10-16 00:00:00
        </span>
        <span>
          更新时间：2022-10-16 00:00:00
        </span>
      </template>
    </SopBasicInfo>
  </div>

  <div class="demo">
    <SopBasicInfo title="标题">
      <template #cover>
        <SopCover type="contract" />
      </template>
    </SopBasicInfo>
  </div>

  <div class="demo">
    <SopBasicInfo title="标题">
      <template #opt>
        <ElButton type="primary" size="small">操作</ElButton>
      </template>
    </SopBasicInfo>
  </div>
</template>

<script setup lang="ts"></script>
