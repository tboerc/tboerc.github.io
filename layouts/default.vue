<template>
  <div class="container mx-auto border-x border-x-black">
    <Header />
    <Container is="main" class="min-h-screen">
      <slot />
    </Container>
    <Footer />
  </div>
</template>
